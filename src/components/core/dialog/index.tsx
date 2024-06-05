import { cn } from "@/src/lib/utils";
import { DialogRoot, DialogContent } from "./root";
import XIcon from "../../icons/XIcon";

type DialogProps = {
  open: boolean;
  closeButton?: boolean | React.ReactNode;
  contentClassName?: string;
  containerClassName?: string;
  onOpenChange: () => void;
  children: React.ReactNode;
};

export default function Dialog({
  open,
  closeButton,
  contentClassName,
  containerClassName,
  onOpenChange,
  children,
}: DialogProps) {
  return (
    <DialogRoot open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <div
          className={cn(
            "mx-auto w-full max-w-xl rounded-lg bg-white p-5 shadow-lg",
            containerClassName,
          )}>
          {closeButton && (
            <div className="w-full" onClick={onOpenChange}>
              {typeof closeButton === "boolean" ? (
                <div className="flex items-center justify-end p-5">
                  <button>
                    <XIcon />
                    <span className="sr-only">Close</span>
                  </button>
                </div>
              ) : (
                closeButton
              )}
            </div>
          )}
          <div className={cn("", contentClassName)}>{children}</div>
        </div>
      </DialogContent>
    </DialogRoot>
  );
}
