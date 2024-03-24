export const cashFormater = (value: string, currency: "usd") => {
  const cash = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(Number(value));
  return cash;
};
