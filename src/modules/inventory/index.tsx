"use client";
import { useState } from "react";
import { useQueryState, parseAsJson } from "nuqs";
import { format } from "date-fns";
import { getAssetImage, getAssetType } from "@/src/lib/utils";
import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import ChevronDownIcon from "@/src/components/icons/ChevronDownIcon";
import GridIcon from "@/src/components/icons/GridIcon";
import ListIcon from "@/src/components/icons/ListIcon";
import MagnifyingGlassIcon from "@/src/components/icons/MagnifyingGlassIcon";
import PlusIcon from "@/src/components/icons/PlusIcon";
import SheetIcon from "@/src/components/icons/SheetIcon";
import { CheckboxRoot } from "@/src/components/core/checkbox/checkbox";
import TableHead from "@/src/components/core/table-head";
import DataTable from "@/src/components/core/data-table";
import Sheet from "@/src/components/core/sheet";
import AddInventory from "./components/AddInventory";
import AssetCard from "./components/AssetCard";
import StatusTag from "./components/StatusTag";
import { assets } from "@/src/data/assets";
import type { TInventory, TData } from "./types";

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
              <Image
                src={getAssetImage(type)}
                alt={type}
                width={30}
                height={30}
              />
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

      return (
        <span className="text-sm text-[#434956]">{getAssetType(type)}</span>
      );
    },
  },
  {
    accessorKey: "status",
    header: () => <TableHead name="Status" />,
    cell: ({ row }) => {
      const { status } = row.original;

      return <StatusTag status={status} />;
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
  const [data, setData] = useQueryState<TData>(
    "data",
    parseAsJson<TData>().withDefault({
      view: "list",
      tab: "all",
    }),
  );
  const [data2, setData2] = useState<any>({
    openSheet: false,
    rowSelection: {},
  });

  function handleDataChange(key: keyof TData, value: TData[keyof TData]) {
    setData({ ...data, [key]: value });
  }

  function handleData2Change(
    key: keyof typeof data2,
    value: (typeof data2)[keyof typeof data2],
  ) {
    setData2({ ...data2, [key]: value });
  }

  function refineAssets() {
    if (
      data.tab === "capsule" ||
      data.tab === "big-energy" ||
      data.tab === "energy-box"
    ) {
      return assets.filter((asset) => asset.type === data.tab);
    }

    if (data.tab === "others") {
      return assets.filter(
        (asset) => asset.type === "bike" || asset.type === "van",
      );
    }

    return assets;
  }

  return (
    <>
      <div>
        <div className="flex items-center">
          {[
            { name: "All Assets", count: 690, value: "all" },
            { name: "Reeddi Capsule", count: 550, value: "capsule" },
            { name: "EnergyBOX", count: 550, value: "energy-box" },
            { name: "BigEnergy", count: 550, value: "big-energy" },
            { name: "Others", count: 140, value: "others" },
          ].map(({ name, count, value }, index) => (
            <button
              key={index}
              onClick={() => handleDataChange("tab", value as TData["tab"])}
              className={`$ flex items-center space-x-2 px-3 py-2.5 ${
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
          <div className="flex flex-col space-y-5 md:flex-row md:items-center md:justify-between md:space-x-3 md:space-y-0">
            <div className="flex w-full sm:space-x-5 md:w-[44%] md:items-center xl:w-[65%]">
              <div className="hidden items-center sm:flex">
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

              <div className="relative w-full">
                <MagnifyingGlassIcon className="absolute left-4 top-3" />
                <input
                  type="text"
                  placeholder="Search"
                  className="h-[42px] w-full rounded-sm border border-wheels-grey-4 pl-10 pr-3 text-sm text-wheels-primary outline-none focus:border-wheels-primary"
                />
              </div>
            </div>

            <div className="flex items-center sm:space-x-3 md:w-[55%] md:justify-end xl:w-[35%]">
              <button className="hidden items-center space-x-2.5 rounded-lg border border-wheels-grey-4 px-4 py-2.5 sm:flex">
                <SheetIcon />
                <span className="text-sm font-medium text-wheels-primary">
                  Export
                </span>
              </button>

              <button className="mr-3 flex items-center space-x-2.5 rounded-lg border border-wheels-grey-4 px-4 py-2.5 sm:mr-0">
                <SheetIcon />
                <span className="text-sm font-medium text-wheels-primary">
                  More
                </span>
                <ChevronDownIcon />
              </button>

              <button
                onClick={() => handleData2Change("openSheet", !data2.openSheet)}
                className="flex items-center space-x-2 rounded-lg bg-wheels-primary px-4 py-2.5 text-white"
              >
                <PlusIcon />
                <span className="text-sm font-medium">Add New</span>
              </button>
            </div>
          </div>

          <div className="mt-10">
            {data.view === "list" ? (
              <DataTable
                data={refineAssets()}
                columns={columns}
                rowSelection={data2.rowSelection}
                setRowSelection={(value: TInventory) =>
                  handleData2Change("rowSelection", value)
                }
              />
            ) : (
              <div className="xs:grid-cols-2 grid grid-cols-1 gap-5 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                {refineAssets().map((asset, index) => (
                  <AssetCard key={index} {...asset} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Sheet
        open={data2.openSheet}
        onOpenChange={() => handleData2Change("openSheet", !data2.openSheet)}
        className="w-full max-w-full px-0 pb-0 md:max-w-[520px]"
        showCloseButton
      >
        <AddInventory close={() => handleData2Change("openSheet", false)} />
      </Sheet>
    </>
  );
}
