import { cn } from "@/src/lib/utils";
import {
  SelectRoot,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./root";

type SelectProps = {
  label?: string;
  options: {
    label: string;
    value: string;
  }[];
  placeholder?: string;
  triggerClassName?: string;
  value: string;
  onChange: (val: string) => void;
};

export default function Select({
  label,
  options,
  placeholder,
  triggerClassName,
  value,
  onChange,
}: SelectProps) {
  return (
    <label className="block h-full w-full">
      {label && (
        <span className="mb-2 block text-sm text-[rgba(85,112,126,1)]">
          {label}
        </span>
      )}
      <SelectRoot value={value} onValueChange={onChange}>
        <SelectTrigger
          className={cn("h-12 w-full text-sm", {
            "text-wheels-grey": !value,
            triggerClassName,
          })}>
          <SelectValue placeholder={placeholder || "Select an option"} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>
    </label>
  );
}
