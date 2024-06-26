import { cn } from "@/src/lib/utils";
type FormButtonProps = {
  children: React.ReactNode;
  className?: string;
};
const FormButton = ({ children, className }: FormButtonProps) => {
  return (
    <button
      className={cn(
        "w-full rounded-lg border border-wheels-primary bg-white px-10 py-3 font-semibold transition-all duration-200 ease-in-out hover:bg-wheels-primary hover:text-white",
        className,
      )}
      type="submit">
      {children}
    </button>
  );
};

export default FormButton;
