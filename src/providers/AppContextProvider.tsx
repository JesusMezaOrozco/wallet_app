import {
  GET_PRICES_API_URL,
  GET_PROFILE_API_URL,
  GET_TRANSACTIONS_API_URL,
  POST_EXCHANGE_API_URL,
} from "@/constants/api_urls";
import { Transaction, Transfer, User } from "@/types";
import axios, { AxiosResponse } from "axios";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { FeedbackContext } from "./FeedbackProvider";

const DESTINY_CURRENCY = "usdc";

type TAppContext = {
  profile: User | null;
  transactions: Transaction[] | null;
  transfer: (transferData: Transfer) => void;
  prices: Record<string, Record<string, number>>;
  getPrices: VoidFunction;
};

export const AppContext = createContext<TAppContext>({
  profile: null,
  transactions: [],
  transfer: () => {},
  prices: {},
  getPrices: () => {},
});

type Props = {
  children: ReactNode;
};

export const AppContextProvider = ({ children }: Props) => {
  const [profile, setProfile] = useState<User | null>(null);
  const [prices, setPrices] = useState({});
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { setIsLoading, setFeedback, setIsOpen } = useContext(FeedbackContext);

  const getProfileData = useCallback(async () => {
    setIsLoading(true);
    await axios({
      baseURL: import.meta.env.VITE_VITA_WALLET_API,
      method: "get",
      url: GET_PROFILE_API_URL,
      headers: JSON.parse(localStorage.getItem("auth-data") as string),
    })
      .then((response: AxiosResponse) => {
        const { data } = response.data;
        const { id, balances, default_currency, email, first_name, last_name } =
          data.attributes;
        setProfile({
          id,
          balances,
          default_currency,
          email,
          first_name,
          last_name,
        });
      })
      .catch(() => {
        setIsOpen(true);
        setFeedback({
          status: "error",
          message: "No pudimos obtener la informacion del usuario :(",
        });
      })
      .finally(() => setIsLoading(false));
  }, [setIsLoading, setFeedback, setIsOpen]);

  const getTransactions = useCallback(async () => {
    setIsLoading(true);
    await axios({
      baseURL: import.meta.env.VITE_VITA_WALLET_API,
      method: "get",
      url: GET_TRANSACTIONS_API_URL,
      headers: JSON.parse(localStorage.getItem("auth-data") as string),
    })
      .then((response: AxiosResponse) => {
        const { data } = response.data;
        const transactionList = data.map((transaction) => {
          return {
            id: transaction.attributes.id,
            category: transaction.attributes.category,
            value: transaction.attributes.amount,
            currency: transaction.attributes.currency,
          };
        });
        setTransactions(transactionList);
      })
      .catch(() => {
        setIsOpen(true);
        setFeedback({
          status: "error",
          message: "No pudimos obtener el listado de transacciones :(",
        });
      })
      .finally(() => setIsLoading(false));
  }, [setIsLoading, setIsOpen, setFeedback]);

  const getPrices = useCallback(async () => {
    setIsLoading(true);
    await axios({
      baseURL: import.meta.env.VITE_VITA_WALLET_API,
      method: "get",
      url: GET_PRICES_API_URL,
      headers: JSON.parse(localStorage.getItem("auth-data") as string),
    })
      .then(({ data }: AxiosResponse) => {
        const { prices } = data;
        setPrices(prices);
      })
      .catch(() => {
        setIsOpen(true);
        setFeedback({
          status: "error",
          message: "No pudimos obtener la lista de precios :(",
        });
      })
      .finally(() => setIsLoading(false));
  }, [setIsLoading, setIsOpen, setFeedback]);

  const transfer = useCallback(
    async (transferData: Transfer) => {
      setIsLoading(true);
      await axios({
        baseURL: import.meta.env.VITE_VITA_WALLET_API,
        method: "post",
        url: POST_EXCHANGE_API_URL,
        data: transferData,
        headers: JSON.parse(localStorage.getItem("auth-data") as string),
      })
        .then(() => {
          setTransactions((prev) => {
            return [
              {
                category: "exchange",
                currency: DESTINY_CURRENCY,
                id: String(new Date().getDate()),
                value: String(transferData.amount_sent),
              },
              ...prev,
            ];
          });
          setIsOpen(true);
          setFeedback({
            status: "success",
            message: "El destinatario recibirá el dinero en 30 minutos :)",
          });
        })
        .catch(({ response }) => {
          const { data } = response;
          setIsOpen(true);
          setFeedback({
            status: "error",
            message: data.message,
          });
        })
        .finally(() => setIsLoading(false));
    },
    [setIsLoading, setIsOpen, setFeedback, setTransactions],
  );

  useEffect(() => {
    getPrices();
    getProfileData();
    getTransactions();
  }, [getProfileData, getTransactions, getPrices]);

  return (
    <AppContext.Provider
      value={{
        profile,
        getPrices,
        transactions,
        transfer,
        prices,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
