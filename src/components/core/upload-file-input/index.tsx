import { cn } from "@/src/lib/utils";

type TFileInputProps = {
  label: string;
  className?: string;
};
export default function FileInput({ label, className }: TFileInputProps) {
  return (
    <div className={cn("align-center flex flex-col space-y-2", className)}>
      <label className="align-center flex flex-col space-y-2">
        {label && (
          <span className="mb-2 block text-sm text-[rgba(85,112,126,1)]">
            {label}
          </span>
        )}
        <input type="file" />
      </label>
    </div>
  );
}
