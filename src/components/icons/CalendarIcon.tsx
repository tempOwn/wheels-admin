import { cn } from "@/src/lib/utils";
import type { TProps } from "./types";

export default function CalendarIcon({ className }: TProps) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-[#55707E]", className)}>
      <path
        d="M11.875 2.50012H3.12503C2.43467 2.50012 1.87503 3.05977 1.87503 3.75012V12.5001C1.87503 13.1905 2.43467 13.7501 3.12503 13.7501H11.875C12.5654 13.7501 13.125 13.1905 13.125 12.5001V3.75012C13.125 3.05977 12.5654 2.50012 11.875 2.50012Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.87503 6.25H13.125"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 1.25V3.75"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 1.25V3.75"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
