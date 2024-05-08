"use client";
import { useState } from "react";
import { useQueryState, parseAsJson } from "nuqs";
import { format } from "date-fns";
import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import ChevronDownIcon from "@/src/components/icons/ChevronDownIcon";
import FilterIcon from "@/src/components/icons/FilterIcon";
import GridIcon from "@/src/components/icons/GridIcon";
import ListIcon from "@/src/components/icons/ListIcon";
import MagnifyingGlassIcon from "@/src/components/icons/MagnifyingGlassIcon";
import PlusIcon from "@/src/components/icons/PlusIcon";
import SheetIcon from "@/src/components/icons/SheetIcon";
import { CheckboxRoot } from "@/src/components/core/checkbox/checkbox";
import TableHead from "@/src/components/core/table-head";
import DataTable from "@/src/components/core/data-table";

type TData = {
  view: "list" | "grid";
  tab: "all" | "reeddi-system" | "others";
};

type TInventory = {
  id: string;
  type: "capsule" | "energy-box" | "big-energy" | "bike" | "van";
  status: "active" | "inactive";
  dateAdded: Date;
};

function getImage(type: TInventory["type"]) {
  switch (type) {
    case "capsule":
      return "/assets/images/reeddi-capsule.png";
    case "energy-box":
      return "/assets/images/reeddi-energy-box.png";
    case "big-energy":
      return "/assets/images/reeddi-big-energy.png";
    case "bike":
      return "/assets/images/bike.png";
    case "van":
      return "/assets/images/van.png";
  }
}

function getType(type: TInventory["type"]) {
  switch (type) {
    case "capsule":
      return "Reeddi Capsule";
    case "energy-box":
      return "Reeddi Energy Box";
    case "big-energy":
      return "Reeddi Big Energy";
    case "bike":
      return "Bike";
    case "van":
      return "Van";
  }
}

function getStatusClasses(status: TInventory["status"]) {
  switch (status) {
    case "active":
      return "bg-[rgba(16,185,129,0.1)] text-[#10B981]";
    case "inactive":
      return "bg-[rgba(239,68,68,0.1)] text-wheels-error";
    default:
      return "";
  }
}

const inventoryList: TInventory[] = [
  {
    id: "RC-81247931",
    type: "capsule",
    status: "active",
    dateAdded: new Date("2021-09-01"),
  },
  {
    id: "RC-81247932",
    type: "energy-box",
    status: "inactive",
    dateAdded: new Date("2022-04-01"),
  },
  {
    id: "RC-81247933",
    type: "big-energy",
    status: "active",
    dateAdded: new Date("2021-09-01"),
  },
  {
    id: "RC-81247934",
    type: "bike",
    status: "inactive",
    dateAdded: new Date("2021-09-01 04:00"),
  },
  {
    id: "RC-81247935",
    type: "van",
    status: "active",
    dateAdded: new Date("2021-09-01 12:00"),
  },
  {
    id: "RC-21247935",
    type: "capsule",
    status: "active",
    dateAdded: new Date("2021-09-01"),
  },
  {
    id: "RC-81247936",
    type: "energy-box",
    status: "inactive",
    dateAdded: new Date("2022-04-01"),
  },
  {
    id: "RC-91247931",
    type: "capsule",
    status: "active",
    dateAdded: new Date("2021-09-01"),
  },
  {
    id: "RC-83247932",
    type: "energy-box",
    status: "inactive",
    dateAdded: new Date("2022-04-01"),
  },
  {
    id: "RC-41247931",
    type: "capsule",
    status: "active",
    dateAdded: new Date("2021-09-01"),
  },
  {
    id: "RC-71247932",
    type: "energy-box",
    status: "inactive",
    dateAdded: new Date("2022-04-01"),
  },
];

const columns: ColumnDef<TInventory>[] = [
  {
    id: "select",
    header: ({ table }) => {
      return (
        <div className="pl-1">
          <CheckboxRoot
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="pl-1">
        <CheckboxRoot
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: () => <TableHead name="All System" />,
    cell: ({ row }) => {
      const { id, type } = row.original;

      return (
        <div className="flex items-center space-x-2">
          {type && (
            <div>
              <Image src={getImage(type)} alt={type} width={30} height={30} />
            </div>
          )}
          <span className="text-sm font-medium text-[#00080C]">{id}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "type",
    header: () => <TableHead name="Type" />,
    cell: ({ row }) => {
      const { type } = row.original;

      return <span className="text-sm text-[#434956]">{getType(type)}</span>;
    },
  },
  {
    accessorKey: "status",
    header: () => <TableHead name="Status" />,
    cell: ({ row }) => {
      const { status } = row.original;

      return (
        <div
          className={`inline-flex items-center space-x-2 rounded-lg px-2.5 py-1 ${getStatusClasses(status)}`}
        >
          <div className="h-2 w-2 rounded-full bg-current"></div>
          <span className="text-xs capitalize">{status}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "dateAdded",
    header: () => <TableHead name="Date added" />,
    cell: ({ row }) => {
      const { dateAdded } = row.original;

      return (
        <span className="text-sm text-wheels-primary">
          {format(dateAdded, "MMM d, yyyy, h:mma")}
        </span>
      );
    },
  },
];

export default function Inventory() {
  const [rowSelection, setRowSelection] = useState<any>({});
  const [data, setData] = useQueryState<TData>(
    "data",
    parseAsJson<TData>().withDefault({
      view: "list",
      tab: "all",
    }),
  );

  function handleDataChange(key: keyof TData, value: TData[keyof TData]) {
    setData({ ...data, [key]: value });
  }

  return (
    <div>
      <div className="flex items-center">
        {[
          { name: "All Assets", count: 690, value: "all" },
          { name: "Reeddi System", count: 550, value: "reeddi-system" },
          { name: "Others", count: 140, value: "others" },
        ].map(({ name, count, value }, index) => (
          <button
            key={index}
            onClick={() => handleDataChange("tab", value as TData["tab"])}
            className={`$ flex items-center space-x-2 px-4 py-2.5 ${
              value === data.tab
                ? "rounded rounded-bl-none rounded-br-none bg-white text-wheels-primary"
                : "text-wheels-grey"
            }`}
          >
            <div
              className={`rounded-md px-2 py-0.5 text-10 font-medium text-white ${value === data.tab ? "bg-wheels-purple" : "bg-wheels-grey"}`}
            >
              {count}
            </div>
            <p className="text-sm font-medium">{name}</p>
          </button>
        ))}
      </div>

      <div className="rounded bg-white p-5 pt-8">
        <div className="flex items-center justify-between space-x-3">
          <div className="flex w-2/3 space-x-5">
            <div className="flex items-center">
              {[
                {
                  icon: <ListIcon />,
                  value: "list",
                },
                {
                  icon: <GridIcon />,
                  value: "grid",
                },
              ].map(({ icon, value }, index) => (
                <button
                  key={index}
                  onClick={() =>
                    handleDataChange("view", value as TData["view"])
                  }
                  className={`p-2 ${index === 0 ? "rounded-bl-sm rounded-tl-sm" : "rounded-br-sm rounded-tr-sm"} ${data.view === value ? "bg-wheels-primary text-white" : "bg-wheels-grey-2 text-wheels-grey-3"}`}
                >
                  {icon}
                </button>
              ))}
            </div>

            <div className="relative h-12 w-full">
              <MagnifyingGlassIcon className="absolute left-4 top-[16px]" />
              <input
                type="text"
                placeholder="Search"
                className="border-wheels-grey-4 h-12 w-full rounded-sm border pl-10 pr-3 text-sm text-wheels-primary outline-none focus:border-wheels-primary"
              />
            </div>
          </div>

          <div className="flex items-center space-x-3 lg:space-x-4">
            <button className="flex items-center space-x-2">
              <FilterIcon />
              <span className="text-sm font-medium text-wheels-primary">
                Filters
              </span>
            </button>

            <button className="border-wheels-grey-4 flex items-center space-x-2 rounded-lg border px-3 py-2.5">
              <SheetIcon />
              <span className="text-sm font-medium text-wheels-primary">
                Export
              </span>
              <ChevronDownIcon />
            </button>

            <button className="flex items-center space-x-2 rounded-lg bg-wheels-primary px-4 py-2.5 text-white">
              <PlusIcon />
              <span className="text-sm font-medium">Add New</span>
            </button>
          </div>
        </div>

        <div className="mt-5">
          <DataTable
            data={inventoryList}
            columns={columns}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
          />
        </div>
      </div>
    </div>
  );
}
