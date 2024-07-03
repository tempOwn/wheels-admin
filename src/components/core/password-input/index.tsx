"use client";
import { useState } from "react";
import * as React from "react";
import { cn } from "@/src/lib/utils";
import ClosedEyeIcon from "@/src/components/icons/ClosedEyeIcon";
import OpenEyeIcon from "@/src/components/icons/OpenEyeIcon";

type PasswordInputProps = {
  label?: string | React.ReactNode;
  containerClassName?: string;
  className?: string;
  placeholder?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const PasswordInput = React.forwardRef<
  React.ElementRef<"input">,
  PasswordInputProps
>(
  (
    {
      label,
      containerClassName,
      className,
      placeholder,
      ...rest
    }: PasswordInputProps,
    forwardedRef,
  ) => {
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => {
      setIsVisible(!isVisible);
    };

    return (
      <label className="block w-full">
        {label && typeof label === "string" ? (
          <span className="mb-2 block text-sm text-[rgba(85,112,126,1)]">
            {label}
          </span>
        ) : (
          label
        )}
        <div
          className={cn(
            "flex h-12 items-center rounded-lg border-[0.8px] border-wheels-border bg-white pb-1.5 pl-3 pr-5 pt-1 focus:border-wheels-primary ",
            containerClassName,
          )}>
          <input
            {...rest}
            ref={forwardedRef}
            type={isVisible ? "text" : "password"}
            placeholder={placeholder}
            className={cn(
              `h-full w-full text-sm leading-[0] text-wheels-primary outline-none placeholder:text-sm placeholder:text-wheels-grey  ${rest.disabled ? "cursor-not-allowed opacity-50" : "cursor-text"}`,
              className,
            )}
          />
          <span className="pointer" onClick={toggleVisibility}>
            {isVisible ? <OpenEyeIcon /> : <ClosedEyeIcon />}
          </span>
        </div>
      </label>
    );
  },
);

PasswordInput.displayName = "PasswordInput";
export default PasswordInput;
