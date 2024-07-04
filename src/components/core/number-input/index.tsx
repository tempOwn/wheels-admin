"use client";
import { useRef, forwardRef, useEffect } from "react";
import { cn, mergeRefs } from "@/src/lib/utils";

type NumberInputProps = {
  label?: string | React.ReactNode;
  step?: string | number;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  containerClassName?: string;
  onSubmit?: (value: number) => void;
  onValueChange: (value: number) => void;
  children?: React.ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>;

const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      label,
      step,
      placeholder,
      onSubmit,
      onValueChange,
      disabled,
      className,
      containerClassName,
      children,
      ...rest
    }: NumberInputProps,
    forwardedRef,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      const handleWheel = (event: WheelEvent) => {
        if (document.activeElement === inputRef.current) {
          inputRef?.current?.blur();
        }
      };

      document.addEventListener("wheel", handleWheel);

      return () => {
        document.removeEventListener("wheel", handleWheel);
      };
    }, []);

    return (
      <label className="block w-full">
        {label && typeof label === "string" ? (
          <span className="mb-1.5 block text-sm text-[rgba(85,112,126,1)]">
            {label}
          </span>
        ) : (
          label
        )}
        <div className={cn("h-12 overflow-hidden", containerClassName)}>
          <input
            {...rest}
            type="number"
            value={rest.value ?? ""}
            ref={mergeRefs([inputRef, forwardedRef])}
            disabled={disabled}
            placeholder={placeholder}
            className={cn(
              `border-loyaone-border h-full w-full rounded-lg border bg-white px-3 pb-1.5 pt-1 text-sm leading-[0] text-wheels-primary outline-none placeholder:text-sm placeholder:text-wheels-grey focus:border-wheels-primary ${disabled ? "cursor-not-allowed opacity-50" : "cursor-text"}`,
              className,
            )}
            onChange={(e: any) => {
              const value = e.target.value;
              if (value === "-" || disabled) return;

              if (value === "") {
                onValueChange(value);
                return;
              }

              onValueChange(parseFloat(value));
            }}
          />

          {children && children}
        </div>
      </label>
    );
  },
);

NumberInput.displayName = "NumberInput";
export default NumberInput;
