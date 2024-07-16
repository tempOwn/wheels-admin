import { cn } from "@/src/lib/utils";
import LoadingEllipsis from "../core/loaders/LoadingEllipsis";

type StatCardProps = {
  icon: React.ReactNode;
  iconClass: string;
  value: number | string;
  description: string;
  className?: string;
};

export default function StatCard({
  icon,
  iconClass,
  value,
  description,
  className,
}: StatCardProps) {
  return (
    <div className={cn("rounded-sm bg-white p-3 shadow-card", className)}>
      <div
        className={cn(
          "flex h-[22px] w-[22px] items-center justify-center rounded-full",
          iconClass,
        )}>
        {icon}
      </div>

      <div className="mb-1 mt-5 text-lg font-bold text-wheels-primary sm:text-xl md:text-2xl lg:mt-8 xl:text-3xl">
        {value ? value : <LoadingEllipsis className="h-9 w-5" />}
      </div>
      <p className="text-xs text-black lg:text-sm">{description}</p>
    </div>
  );
}
