"use client";
import { useUserInfo } from "@/src/lib/userInfo";
import { format } from "date-fns/format";
import CalendarIcon from "@/src/components/icons/CalendarIcon";
import StatCard from "./components/StatCard";
import PositiveGraphIcon from "@/src/components/icons/PositiveGraphIcon";
import BatteryIcon from "@/src/components/icons/BatteryIcon";
import TopPerformers from "./components/TopPerformers";
import ActivityLogCard from "./components/ActivityLogCard";
import TopSellingSystems from "./components/TopSellingSystems";
import RentalGraph from "./components/RentalGraph";
import type { StatsCardProps } from "./components/StatCard";

const stats: StatsCardProps[] = [
  {
    iconBackgroundClass: "bg-wheels-primary",
    title: "Systems transferred",
    statValue: 46,
    description: (
      <div className="flex items-center space-x-2">
        <div className="inline-flex items-center space-x-2 font-bold">
          <PositiveGraphIcon />
          <span className="text-wheels-success">24%</span>
        </div>
        <span className="text-sm text-wheels-grey">Yesterday</span>
      </div>
    ),
  },
  {
    iconBackgroundClass: "bg-wheels-success",
    title: "Rentals",
    statValue: 12,
    description: (
      <div className="flex items-center space-x-2">
        <span className="font-bold text-wheels-error">17%</span>
        <span className="text-sm text-wheels-grey">Yesterday</span>
      </div>
    ),
  },
  {
    iconBackgroundClass: "bg-wheels-cyan",
    title: "Systems Returned",
    statValue: 32,
  },
  {
    icon: <BatteryIcon />,
    iconBackgroundClass: "bg-wheels-error",
    title: "Faulty Systems",
    statValue: 20,
  },
];

export default function Dashboard() {
  const firstName = useUserInfo("firstName");

  return (
    <section className="space-y-8 p-5">
      <div className="space-y-5 sm:flex sm:items-end sm:justify-between sm:space-x-3 sm:space-y-0">
        <div>
          <h1 className="mb-2 text-xl font-medium sm:text-2xl lg:text-3xl">
            Welcome back, {firstName} 👋
          </h1>
          <span className="text-sm">See detailed analytics</span>
        </div>

        <div className="inline-flex items-center space-x-2 rounded border border-wheels-border bg-white px-2.5 py-3">
          <CalendarIcon />
          <span className="text-sm font-medium text-wheels-grey">
            {format(new Date(), "EEEE do MMMM, yyyy")}
          </span>
        </div>
      </div>

      <div className="space-y-5 xl:flex xl:space-x-5 xl:space-y-0">
        <div className="space-y-5 xl:w-2/3">
          <div className="space-y-5 lg:flex lg:space-x-5 lg:space-y-0">
            <div className="gap-5 space-y-5 sm:grid sm:grid-cols-2 sm:space-y-0 lg:w-2/3">
              {stats.map((stat) => (
                <StatCard key={stat.title} {...stat} />
              ))}
            </div>

            <TopPerformers />
          </div>

          <RentalGraph />
        </div>

        <div className="space-y-5 xl:w-1/3">
          <ActivityLogCard />
          <TopSellingSystems />
        </div>
      </div>
    </section>
  );
}
