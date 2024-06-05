import { twMerge } from "tailwind-merge";
import { CheckboxRoot } from "./checkbox";

type CheckboxProps = {
  value: string;
  label: string | React.ReactNode;
  className?: string;
};

export default function Checkbox({ value, label, className }: CheckboxProps) {
  return (
    <div className={twMerge("flex items-center space-x-2", className)}>
      <CheckboxRoot id={value} />
      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor={value}
          className="cursor-pointer text-sm leading-none text-wheels-primary peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {label}
        </label>
      </div>
    </div>
  );
}
