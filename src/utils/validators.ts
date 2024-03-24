import { InputHTMLAttributes } from "react";

export const formatInputValidator = (
  value: string,
  type: InputHTMLAttributes<HTMLInputElement>["type"],
) => {
  switch (type) {
    case "email":
      return value
        .toLowerCase()
        .match(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/)
        ? true
        : false;
    case "password":
      return value.toLowerCase().length > 4;
    case "number":
      return Number(value) > 0;
    default:
      break;
  }
};
