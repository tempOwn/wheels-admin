import { cn } from "@/src/lib/utils";
import { ScrollAreaRoot, ScrollBar } from "./root";

type ScrollAreaProps = {
  className?: string;
  children: React.ReactNode;
};

export default function ScrollArea({ children, className }: ScrollAreaProps) {
  return (
    <ScrollAreaRoot className={cn("h-[300px] w-[350px]", className)}>
      {children}
    </ScrollAreaRoot>
  );
}

export { ScrollBar };
