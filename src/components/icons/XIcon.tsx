import { cn } from "@/src/lib/utils";
import type { TProps } from "./types";

export default function XIcon({ className }: TProps) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-4 w-4", className)}
    >
      <path
        d="M8.98239 2.98779L6.42158 5.5486L3.86077 2.98779L3.21484 3.63372L5.77565 6.19453L3.21484 8.75533L3.86077 9.40126L6.42158 6.84046L8.98239 9.40126L9.62831 8.75533L7.06751 6.19453L9.62831 3.63372L8.98239 2.98779Z"
        fill="currentColor"
      />
    </svg>
  );
}
