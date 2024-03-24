import axios, { AxiosResponse } from "axios";
import { ReactNode, createContext, useContext, useState } from "react";
import { GET_LOGIN_API_URL } from "@/constants/api_urls";
import { UserCredentials } from "@/types";
import { FeedbackContext } from "./FeedbackProvider";

type Props = {
  children: ReactNode;
};

type TAuthContext = {
  login: (userCredentials: UserCredentials) => void;
  isAuthorized: boolean;
  logout: VoidFunction;
};

export const AuthContext = createContext<TAuthContext>({
  login: () => {},
  isAuthorized: false,
  logout: () => {},
});

export const AuthContextProvider = ({ children }: Props) => {
  const { setIsLoading, setIsOpen, setFeedback } = useContext(FeedbackContext);
  const [isAuthorized, setIsAuthorized] = useState(
    !!localStorage.getItem("auth-data"),
  );
  const login = async (credentials: UserCredentials) => {
    setIsLoading(true);
    await axios({
      baseURL: import.meta.env.VITE_VITA_WALLET_API,
      method: "post",
      data: { ...credentials, dev_mode: true },
      url: GET_LOGIN_API_URL,
      headers: {
        "app-name": "ANGIE",
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((response: AxiosResponse) => {
        const { headers } = response;
        localStorage.setItem(
          "auth-data",
          JSON.stringify({
            "access-token": headers["access-token"],
            client: headers["client"],
            expiry: headers["expiry"],
            uid: headers["uid"],
            "app-name": "ANGIE",
          }),
        );
        setIsAuthorized(true);
        setFeedback({
          message: "Autenticación Exitosa",
          status: "success",
        });
        setIsOpen(true);
      })
      .catch(() => {
        setFeedback({
          message: "Fallo Autenticación",
          status: "error",
        });
      })
      .finally(() => setIsLoading(false));
  };

  const logout = () => {
    setIsLoading(true);
    localStorage.removeItem("auth-data");
    setIsAuthorized(false);
    setIsLoading(false);
    setIsOpen(true);
    setFeedback({
      status: "success",
      message: "Hasta luego!",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        isAuthorized,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
