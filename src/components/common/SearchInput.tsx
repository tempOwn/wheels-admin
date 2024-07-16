import { useState, useCallback } from "react";
import _debounce from "lodash/debounce";
import { cn } from "@/src/lib/utils";
import MagnifyingGlassIcon from "../icons/MagnifyingGlassIcon";

type SearchInputProps = {
  onChange: (searchValue: string) => void;
  placeholder?: string;
  className?: string;
};

export default function SearchInput({
  onChange,
  placeholder = "Search",
  className,
}: SearchInputProps) {
  const [searchValue, setSearchValue] = useState("");

  const debouncedChangeHandler = useCallback(
    _debounce((inputValue: string) => onChange(inputValue), 1000),
    [onChange],
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    debouncedChangeHandler(e.target.value);
  };

  return (
    <div className={cn("relative w-full", className)}>
      <MagnifyingGlassIcon className="absolute left-4 top-3" />
      <input
        type="text"
        placeholder={placeholder}
        value={searchValue}
        onChange={handleInputChange}
        className="h-[42px] w-full rounded-sm border border-wheels-grey-4 pl-10 pr-3 text-sm text-wheels-primary outline-none focus:border-wheels-primary"
      />
    </div>
  );
}
