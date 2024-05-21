import { cn } from "@/src/lib/utils";
import XIcon from "../../icons/XIcon";
import { SheetRoot, SheetContent } from "./sheet";

type SheetProps = {
  open: boolean;
  showCloseButton?: boolean;
  onOpenChange: () => void;
  children: React.ReactNode;
  className?: string;
};

type TClose = {
  onOpenChange: () => void;
};

export function Close({ onOpenChange }: TClose) {
  return (
    <button
      onClick={onOpenChange}
      className="absolute right-5 top-[22px] flex items-center space-x-2 border-none outline-none"
    >
      <span className="flex h-4 w-4 items-center justify-center rounded-full border-[0.5px] border-wheels-grey">
        <XIcon />
      </span>
      <span className="border-wheel-primary text-wheel-primary border-b text-xs font-semibold uppercase">
        Close
      </span>
    </button>
  );
}

export default function Sheet({
  open,
  showCloseButton,
  onOpenChange,
  children,
  className,
}: SheetProps) {
  return (
    <SheetRoot open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className={cn("bg-white pt-10", className)}>
        {showCloseButton && <Close onOpenChange={onOpenChange} />}
        {children}
      </SheetContent>
    </SheetRoot>
  );
}
