import Image from "next/image";
import {
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../select/root";
import { cn } from "@/src/lib/utils";

type CustomSelectProps = {
  tiggerClassName?: string;
  contentClassName?: string;
  placeholder?: string;
  options: {
    name: string;
    value: string;
    icon?: React.ReactNode | string;
  }[];
  value: string;
  onChange?: (value: string) => void;
};

export default function CustomSelect({
  tiggerClassName,
  contentClassName,
  placeholder,
  options,
  value,
  onChange,
}: CustomSelectProps) {
  return (
    <SelectRoot onValueChange={onChange} defaultValue={value}>
      <SelectTrigger
        className={cn("h-12 w-40 rounded-md xl:w-52", tiggerClassName)}>
        <SelectValue placeholder={placeholder || "Select an Option"} />
      </SelectTrigger>
      <SelectContent className={cn("w-[300px]", contentClassName)}>
        {options.map(({ icon, name, value }, index) => (
          <SelectItem
            value={value}
            key={index}
            className={`py-3 ${index !== options.length - 1 && "mb-0.5"}`}>
            <div className="flex items-center space-x-2.5">
              {typeof icon === "string" ? (
                <Image src={icon} width={20} height={20} alt={name} />
              ) : (
                <span>{icon}</span>
              )}
              <span className="text-sm">{name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
}
