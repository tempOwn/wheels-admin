import { cn } from "@/src/lib/utils";
import type { TProps } from "./types";

export default function ArrowRightSkewedIcon({ className }: TProps) {
  return (
    <svg
      width="14"
      height="15"
      viewBox="0 0 14 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-white", className)}>
      <path
        d="M4.08331 10.4168L9.91665 4.5835"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.08331 4.5835H9.91665V10.4168"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
