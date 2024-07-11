import { cn } from "@/src/lib/utils";

type StatCardProps = {
  icon: React.ReactNode;
  iconClass: string;
  value: number | string;
  description: string;
};

export default function StatCard({
  icon,
  iconClass,
  value,
  description,
}: StatCardProps) {
  return (
    <div className="rounded-sm bg-white p-3 shadow-card">
      <div
        className={cn(
          "flex h-[22px] w-[22px] items-center justify-center rounded-full",
          iconClass,
        )}>
        {icon}
      </div>

      <p className="mb-1 mt-5 text-lg font-bold text-wheels-primary sm:text-xl md:text-2xl lg:mt-8 lg:text-3xl">
        {value}
      </p>
      <p className="text-xs text-black lg:text-sm">{description}</p>
    </div>
  );
}
