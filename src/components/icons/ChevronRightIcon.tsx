import { cn } from "@/src/lib/utils";
import type { TProps } from "./types";

export default function ChevronRightIcon({ className }: TProps) {
  return (
    <svg
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-wheels-primary", className)}>
      <path
        d="M6 12.5L10 8.5L6 4.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
