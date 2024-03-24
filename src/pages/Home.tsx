import Balance from "@/components/Balance";
import Transaction from "@/components/Transaction";
import { AppContext } from "@/providers/AppContextProvider";
import { useContext } from "react";

export default function Home() {
  const { profile, transactions } = useContext(AppContext);
  if (profile)
    return (
      <div className="max-h-full overflow-auto p-10 w-full">
        <div className="flex items-center gap-3 font-medium mb-14">
          <img src="/images/coin.png" alt="" />
          <p className="text-[20px]">
            ¡Hola <span className="text-blue-1">{profile?.first_name}! </span>
          </p>
        </div>
        <div>
          <p className="text-[18px] mb-6">Mis Saldos</p>
          <div className="flex flex-wrap gap-5 mb-10">
            {Object.keys(profile.balances).map((key, idx) => {
              return (
                <Balance
                  currency_name={key}
                  value={profile.balances[key]}
                  key={`${key}-${idx}`}
                />
              );
            })}
          </div>
          <h2 className="text-[20px] mb-6">Historial</h2>
          {transactions?.map((transaction, idx) => {
            return (
              <Transaction
                key={`${transaction.id}-${idx}`}
                id={transaction.id}
                value={transaction.value}
                category={transaction.category}
                currency={transaction.currency}
              />
            );
          })}
        </div>
      </div>
    );
}
