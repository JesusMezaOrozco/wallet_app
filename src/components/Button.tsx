import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "outlined" | "contained";
  size?: "small" | "large";
};

export default function Button(ButtonProps: Props) {
  const getWidthBySize = () => {
    switch (ButtonProps.size) {
      case "large":
        return "w-[488px]";
      case "small":
        return "w-[183px]";
      default:
        return "w-[488px]";
    }
  };
  const getClassesByVariant = () => {
    if (!ButtonProps.disabled) {
      switch (ButtonProps.variant) {
        case "contained":
          return "text-white";
        case "outlined":
          return "bg-white text-blue-1";
      }
    } else {
      return "bg-gray-2 text-white";
    }
  };
  return (
    <div
      className={
        `h-[54px] flex item-center justify-center p-[1px] rounded-[6px] ${!ButtonProps["disabled"] ? "bg-gradient-to-r from-blue-2 to-blue-1 text-white" : ""} ` +
        getWidthBySize()
      }
    >
      <button
        {...ButtonProps}
        className={`w-full rounded-[6px] ` + getClassesByVariant()}
      >
        {ButtonProps.children}
      </button>
    </div>
  );
}
