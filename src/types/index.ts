export type UserCredentials = {
  email: string;
  password: string;
};

export type User = {
  first_name: string;
  last_name: string;
  email: string;
  id: string;
  balances: { [s: string]: string };
  default_currency: string;
};

export type Transaction = {
  id: string;
  category: "exchange" | "deposit";
  value: string;
  currency: string;
};

export type Transfer = {
  current_sent: string;
  current_received: string;
  amount_sent: number;
};
