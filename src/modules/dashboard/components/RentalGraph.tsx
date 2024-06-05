import { useState } from "react";
import { Line } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import DropdownMenu from "@/src/components/core/dropdown-menu";
import Chart from "chart.js/auto";
import SortIcon from "@/src/components/icons/SortIcon";
import FilterLinesIcon from "@/src/components/icons/FilterLinesIcon";
import SheetIcon from "@/src/components/icons/SheetIcon";
import { cn } from "@/src/lib/utils";

Chart.register(CategoryScale);

type TData = {
  openFiltersDropDown: boolean;
  openSortDropDown: boolean;
  filter: "all" | "capsule" | "energybox" | "bigenergy";
  sort: "week" | "month" | "year";
};

const filterOptions = [
  {
    label: "All Systems",
    value: "all",
  },
  {
    label: "Capsules",
    value: "capsules",
  },
  {
    label: "Energy Box",
    value: "energybox",
  },
  {
    label: "Big Energy",
    value: "bigenergy",
  },
];

const sortOptions = [
  {
    label: "This Week",
    value: "week",
  },
  {
    label: "This Month",
    value: "month",
  },
  {
    label: "This Year",
    value: "year",
  },
];

const chartData = {
  labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  datasets: [
    {
      label: "Capsules",
      data: [56, 42, 33, 38, 24],
      borderColor: "#10B981",
      borderWidth: 3,
    },
    {
      label: "EnergyBox",
      data: [12, 22, 26, 31, 36],
      borderColor: "#2CCFF3",
      borderWidth: 3,
    },
    {
      label: "BigEnergy",
      data: [10, 2, 15, 32, 11],
      borderColor: "#DEB887",
      borderWidth: 3,
    },
  ],
};

function Label({
  label,
  count,
  className,
}: {
  label: string;
  count: number;
  className: string;
}) {
  return (
    <div className="flex items-center space-x-2 text-xs">
      <div className={cn("h-2 w-2 rounded-full", className)} />
      <span className="text-wheels-primary">{label}</span>
      <span className="font-bold text-wheels-secondary">{count}</span>
    </div>
  );
}

export default function RentalGraph() {
  const [data, setData] = useState<TData>({
    openFiltersDropDown: false,
    openSortDropDown: false,
    filter: "all",
    sort: "week",
  });

  function handleData({
    key,
    value,
  }: {
    key: string;
    value: string | boolean;
  }) {
    setData((prev) => ({
      ...prev,
      openFiltersDropDown:
        key === "openFiltersDropDown" ? prev.openFiltersDropDown : false,
      openSortDropDown:
        key === "openSortDropDown" ? prev.openSortDropDown : false,
      [key]: value,
    }));
  }

  return (
    <div className="rounded-lg border border-wheels-border-2 bg-white p-5 shadow-lg">
      <div className="space-y-3 border-b-4 pb-4">
        <div className="space-y-2 md:space-y-4 lg:flex lg:items-center lg:justify-between lg:space-y-0">
          <p className="text-xl font-bold md:text-2xl lg:text-3xl">
            157 Systems
          </p>

          <div className="flex w-full flex-col space-y-4 text-sm font-medium text-wheels-grey sm:flex-row sm:items-center sm:space-x-3 sm:space-y-0 lg:w-auto">
            <DropdownMenu
              open={data.openFiltersDropDown}
              onOpenChange={() =>
                handleData({
                  key: "openFiltersDropDown",
                  value: !data.openFiltersDropDown,
                })
              }
              contentClassName="mt-2 rounded">
              <span className="flex h-10 w-full items-center space-x-3 rounded border border-wheels-border-2 bg-white px-3 sm:w-[140px]">
                <FilterLinesIcon />
                <span>
                  {
                    filterOptions.find((option) => option.value === data.filter)
                      ?.label
                  }
                </span>
              </span>

              <ul className="w-40 space-y-2">
                {filterOptions.map(({ label, value }, index) => (
                  <li
                    key={index}
                    onClick={handleData.bind(null, { key: "filter", value })}
                    className="cursor-pointer px-2 py-1 text-sm hover:font-bold hover:text-wheels-primary">
                    {label}
                  </li>
                ))}
              </ul>
            </DropdownMenu>

            <button className="flex h-10 w-full items-center space-x-2 rounded border border-wheels-border-2 px-3 font-medium sm:w-auto">
              <SheetIcon />
              <span>Export as PDF</span>
            </button>

            <DropdownMenu
              open={data.openSortDropDown}
              onOpenChange={() =>
                handleData({
                  key: "openSortDropDown",
                  value: !data.openSortDropDown,
                })
              }
              contentClassName="mt-2 rounded">
              <span className="flex h-10 w-full items-center space-x-3 rounded border border-wheels-border-2 bg-white px-3 sm:w-[140px]">
                <SortIcon />
                <span>
                  {
                    sortOptions.find((option) => option.value === data.sort)
                      ?.label
                  }
                </span>
              </span>

              <ul className="w-40 space-y-2">
                {sortOptions.map(({ label, value }, index) => (
                  <li
                    key={index}
                    onClick={handleData.bind(null, { key: "sort", value })}
                    className="cursor-pointer px-2 py-1 text-sm hover:font-bold hover:text-wheels-primary">
                    {label}
                  </li>
                ))}
              </ul>
            </DropdownMenu>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <span>Total Systems rented</span>
          <p className="text-wheels-tertiary">
            <span className="font-bold text-wheels-success">24%</span> Yesterday
          </p>
        </div>
      </div>

      <div className="px-4 py-8">
        <Line
          data={chartData}
          options={{
            plugins: {
              legend: {
                display: false,
              },
            },
          }}
        />

        <div className="mt-5 space-y-2 sm:mt-8 sm:flex sm:items-center sm:space-x-5 sm:space-y-0 md:space-x-10">
          <Label label="Capsule" count={22} className="bg-wheels-success" />
          <Label label="EnergyBox" count={22} className="bg-[#2CCFF3]" />
          <Label label="BigEnergy" count={22} className="bg-[#DEB887]" />
        </div>
      </div>
    </div>
  );
}
