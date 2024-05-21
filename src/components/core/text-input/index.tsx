"use client";
import * as React from "react";
import { cn } from "@/src/lib/utils";

type TextInputProps = {
  label?: string | React.ReactNode;
  type?: "text" | "number";
  containerClassName?: string;
  className?: string;
  placeholder?: string;
  children?: React.ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>;

const TextInput = React.forwardRef<React.ElementRef<"input">, TextInputProps>(
  (
    {
      label,
      type = "text",
      containerClassName,
      className,
      placeholder,
      children,
      ...rest
    }: TextInputProps,
    forwardedRef,
  ) => {
    return (
      <label className="block w-full">
        {label && typeof label === "string" ? (
          <span className="mb-2 block text-sm text-[rgba(85,112,126,1)]">
            {label}
          </span>
        ) : (
          label
        )}
        <div className={cn("h-12 overflow-hidden", containerClassName)}>
          <input
            {...rest}
            ref={forwardedRef}
            type={type}
            placeholder={placeholder}
            className={cn(
              `h-full w-full rounded-lg border-[0.8px] border-wheels-border bg-white px-5 pb-1.5 pt-1 text-sm leading-[0] text-wheels-primary outline-none placeholder:text-sm placeholder:text-wheels-grey focus:border-wheels-primary ${rest.disabled ? "cursor-not-allowed opacity-50" : "cursor-text"}`,
              className,
            )}
          />
          {children && children}
        </div>
      </label>
    );
  },
);

TextInput.displayName = "TextInput";
export default TextInput;
