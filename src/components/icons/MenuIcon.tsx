import { cn } from "@/src/lib/utils";
import type { TProps } from "./types";

export default function MenuIcon({ className }: TProps) {
  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-wheels-secondary", className)}
    >
      <path
        d="M3.25 12.5H21.25M3.25 6.5H21.25M3.25 18.5H21.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
