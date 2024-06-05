import { cn } from "@/src/lib/utils";
import type { TProps } from "./types";

export default function ChevronLeftIcon({ className }: TProps) {
  return (
    <svg
      width="6"
      height="11"
      viewBox="0 0 6 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-wheels-primary", className)}>
      <path
        d="M5 9.5L1 5.5L5 1.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
