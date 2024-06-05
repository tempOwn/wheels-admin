import { cn } from "@/src/lib/utils";
import type { TProps } from "./types";

export default function FilterLinesIcon({ className }: TProps) {
  return (
    <svg
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-wheels-grey", className)}>
      <path
        d="M5 10.5H15M2.5 5.5H17.5M7.5 15.5H12.5"
        stroke="currentColor"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
