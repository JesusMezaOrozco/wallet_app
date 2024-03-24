import { cashFormater } from "@/utils/formaters";

type Balance = {
  currency_name: string;
  value: string;
};

export default function Balance({ currency_name, value }: Balance) {
  return (
    <div className="h-[129px] w-[285px] border-2 border-gray-2 rounded-[6px] bg-gray-3 p-6 flex flex-wrap gap-7">
      <div className="w-full">
        <p className="text-[14px]">{currency_name.toUpperCase()}</p>
      </div>
      <div>
        <p className="font-medium text-[20px]">{cashFormater(value, "usd")}</p>
      </div>
    </div>
  );
}
