import { cn } from "@/src/lib/utils";
import type { TProps } from "./types";

export default function ChevronRightIcon({ className }: TProps) {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-[#80939E]", className)}
    >
      <path
        d="M6.375 12.5L10.625 8.5L6.375 4.5"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
