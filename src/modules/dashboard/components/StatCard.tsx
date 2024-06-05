import InfoIcon from "@/src/components/icons/InfoIcon";
import SystemsIcon from "@/src/components/icons/SystemsIcon";
import { cn } from "@/src/lib/utils";

export type StatsCardProps = {
  icon?: React.ReactNode;
  iconBackgroundClass: string;
  title: string;
  statValue: number;
  description?: JSX.Element | string;
};

export default function StatCard({
  icon,
  iconBackgroundClass,
  description,
  statValue,
  title,
}: StatsCardProps) {
  return (
    <div className="flex flex-col justify-between rounded-lg border border-wheels-border-2 bg-white p-4">
      <div className="mb-10 flex items-center justify-between space-x-2 lg:mb-5">
        <div
          className={cn(
            "flex h-6 w-6 items-center justify-center rounded-full",
            iconBackgroundClass,
          )}>
          {icon ? icon : <SystemsIcon />}
        </div>

        {description && (
          <>
            {typeof description === "string" ? (
              <p className="text-sm text-wheels-grey">{description}</p>
            ) : (
              description
            )}
          </>
        )}
      </div>

      <div className="">
        <p className="mb-2 text-2xl font-bold text-wheels-primary sm:text-3xl md:text-4xl">
          {statValue}
        </p>
        <div className="flex items-center justify-between space-x-2">
          <span className="text-sm text-wheels-secondary">{title}</span>
          <button>
            <InfoIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
