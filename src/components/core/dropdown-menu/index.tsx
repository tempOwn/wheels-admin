import { cn } from "@/src/lib/utils";
import {
  DropDownMenuRoot,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./root";

type DropdownMenuProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  contentClassName?: string;
  triggerClassName?: string;
};

export default function DropdownMenu({
  open,
  onOpenChange,
  children,
  contentClassName,
  triggerClassName,
}: DropdownMenuProps) {
  const slots = Array.isArray(children);

  const triggerSlot = slots && children[0];
  const content = slots && children[1];

  return (
    <DropDownMenuRoot open={open} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger
        className={cn("border-none outline-none", triggerClassName)}>
        {triggerSlot}
      </DropdownMenuTrigger>

      <DropdownMenuContent className={cn("bg-white", contentClassName)}>
        {content}
      </DropdownMenuContent>
    </DropDownMenuRoot>
  );
}
