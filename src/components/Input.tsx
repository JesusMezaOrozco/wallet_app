import { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  endicon?: string;
  starticon?: string;
  textValueDecorator?: string;
  changeinputtype?: VoidFunction;
};

export default function Input(InputProps: Props) {
  return (
    <div className="flex border border-gray-1 w-[488px] rounded-[6px] items-center">
      {InputProps.starticon && (
        <div className="w-[60px] rounded-l-[6px] flex items-center justify-center">
          <img
            src={InputProps.starticon}
            alt="start-icon"
            width={24}
            height={24}
          />
        </div>
      )}
      <input
        id={InputProps.id}
        name={InputProps.name}
        value={InputProps.value}
        type={InputProps.type}
        placeholder={InputProps.placeholder}
        onChange={InputProps.onChange}
        className="h-[54px] rounded-[6px] w-[100%] focus:outline-none pl-3"
      />
      {InputProps.endicon && (
        <div
          className="w-[60px] rounded-l-[6px] flex items-center justify-center hover:cursor-pointer"
          onClick={InputProps.changeinputtype}
        >
          <img src={InputProps.endicon} alt="end-icon" width={24} height={24} />
        </div>
      )}
    </div>
  );
}
