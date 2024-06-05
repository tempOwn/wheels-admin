import { cn } from "@/src/lib/utils";
import { TProps } from "./types";

export default function SlantArrowIcon({ className }: TProps) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("", className)}>
      <path
        d="M15.2311 6.36328L6.34219 15.2521"
        stroke="currentColor"
        strokeWidth="2.08696"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.2311 15.2521H6.34219V6.36328"
        stroke="currentColor"
        strokeWidth="2.08696"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
