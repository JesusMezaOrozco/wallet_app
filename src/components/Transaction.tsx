import { Transaction as TTransaction } from "@/types";
import { cashFormater } from "@/utils/formaters";

export default function Transaction({
  value,
  currency,
  category,
}: TTransaction) {
  const name = category[0].toUpperCase() + category.substring(1);
  return (
    <div className="flex justify-between border-b-[1px] h-[54px] items-center border-gray-2">
      <p>{name}</p>
      <p
        className={
          category === "deposit"
            ? "before:content-['+'] text-blue-2"
            : "before:content-['-'] text-red" + " font-medium"
        }
      >
        {cashFormater(value, "usd")} {currency.toUpperCase()}
      </p>
    </div>
  );
}
