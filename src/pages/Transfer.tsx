import Button from "@/components/Button";
import Input from "@/components/Input";
import { AppContext } from "@/providers/AppContextProvider";
import { cashFormater } from "@/utils/formaters";
import { formatInputValidator } from "@/utils/validators";
import {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const transferInitialState = {
  destiny: "",
  amount_sent: "",
  description: "",
  exchangeRelation: "",
  send_duration: "",
};

const destinyAmountInitialState = "$ 0 USDC";
const user_currency = "usd";
const destiny_currency = "usdc";

export default function Transfer() {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [destinyAmount, setDestinyAmount] = useState(destinyAmountInitialState);
  const [factorExchange, setFactorExchange] = useState(0);
  const [transferData, setTransferData] = useState(transferInitialState);
  const { transfer, prices, profile, getPrices } = useContext(AppContext);

  const handleTransfer = useCallback(() => {
    if (!isConfirmed) {
      getPrices();
      setIsConfirmed(true);
      return;
    }
    transfer({
      amount_sent: Number(transferData.amount_sent),
      current_sent: user_currency,
      current_received: destiny_currency,
    });
    setTransferData(transferInitialState);
    setDestinyAmount(destinyAmountInitialState);
    setFactorExchange(0);
    setIsConfirmed(false);
  }, [isConfirmed, transfer, transferData, getPrices]);

  const handleTransferData = (event: ChangeEvent<HTMLInputElement>) => {
    setTransferData({
      ...transferData,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    if (prices) {
      const factorConversion = prices[user_currency];
      if (factorConversion)
        setFactorExchange(factorConversion[destiny_currency]);
    }
  }, [prices]);

  useEffect(() => {
    setTransferData((prev) => {
      return {
        ...prev,
        exchangeRelation: `1 ${user_currency.toUpperCase()} = ${factorExchange} ${destiny_currency.toUpperCase()}`,
      };
    });
  }, [factorExchange]);

  useEffect(() => {
    setDestinyAmount(
      `$ ${Number(transferData.amount_sent) * factorExchange} ${destiny_currency.toUpperCase()}`,
    );
  }, [transferData, factorExchange]);

  return (
    <div className="p-32 flex flex-col overflow-auto w-full">
      <p className="font-medium text-[30px] mb-24">¿Cuánto deseas enviar?</p>
      {!isConfirmed ? (
        <div>
          <div className="mb-16">
            <label>Tú envías</label>
            <Input
              id="amount_sent-input"
              name="amount_sent"
              placeholder={"0.00" + ` ${user_currency.toUpperCase()}`}
              type="number"
              value={transferData.amount_sent}
              onChange={handleTransferData}
              starticon="/images/dollar-sign.svg"
              endicon={
                formatInputValidator(transferData.amount_sent, "number")
                  ? "/images/check.svg"
                  : ""
              }
            />
            <br />
            <span className="text-blue-2">
              Saldo disponible:{" "}
              {cashFormater(profile?.balances[user_currency] as string, "usd")}{" "}
              {user_currency.toUpperCase()}
            </span>
          </div>
          <div className="mb-5">
            <p className="text-[30px] font-medium mb-5">Destinatario</p>
            <label>Correo electrónico</label>
            <Input
              id="destiny-input"
              value={transferData.destiny}
              name="destiny"
              type="email"
              placeholder="Ej. jemezor@hotmail.com"
              onChange={handleTransferData}
              endicon={
                formatInputValidator(transferData.destiny, "email")
                  ? "/images/check.svg"
                  : ""
              }
            />
          </div>
          <div className="mb-20">
            <label>Descripción</label>
            <Input
              id="description-input"
              placeholder="Escribe aqui un mensaje corto"
              type="text"
              value={transferData.description}
              name="description"
              onChange={handleTransferData}
            />
          </div>
        </div>
      ) : (
        <div className="w-[488px] h-[202px] bg-gray-2 rounded-[6px] p-5 flex flex-col justify-between mb-72">
          <div className="flex justify-between">
            <p className="text-[14px]">Destinatario</p>
            <p>{transferData.destiny}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-[14px]">Tu envias</p>
            <p>
              $ {transferData.amount_sent} {user_currency.toUpperCase()}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-[14px]">Tasa de cambio</p>
            <p>{transferData.exchangeRelation}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-[14px]">Destinatario recibe</p>
            <p>{destinyAmount}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-[14px]">Fecha de arribo</p>
            <p>30 minutos</p>
          </div>
        </div>
      )}
      <div className="flex w-[488px] justify-between">
        <Button
          onClick={() => setIsConfirmed(false)}
          size="small"
          variant="outlined"
        >
          Atras
        </Button>
        <Button
          size="small"
          onClick={handleTransfer}
          disabled={
            transferData.amount_sent === "" || transferData.destiny === ""
          }
        >
          {isConfirmed ? "Transferir" : "Continuar"}
        </Button>
      </div>
    </div>
  );
}
