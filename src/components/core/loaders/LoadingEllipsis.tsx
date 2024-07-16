import { cn } from "@/src/lib/utils";

type LoadingEllipsisProps = {
  withText?: boolean;
  customText?: string;
  direction?: "left" | "right" | "center";
  className?: string;
};

export default function LoadingEllipsis({
  withText,
  direction = "center",
  className,
  customText,
}: LoadingEllipsisProps) {
  return (
    <div
      className={cn(
        "loading-el flex items-center text-sm",
        withText && "min-w-[80px]",
        direction === "left" && "justify-start text-left",
        direction === "right" && "justify-end text-right",
        direction === "center" && "justify-center text-center",
        className,
      )}>
      {withText && <>{customText ? customText : "Loading"}</>}
    </div>
  );
}
