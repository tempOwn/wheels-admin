"use client";
import { useState } from "react";
import { parseAsJson, useQueryState } from "nuqs";
import { format } from "date-fns";
import Image from "next/image";
import GridIcon from "@/src/components/icons/GridIcon";
import { getIntials } from "@/src/lib/utils";
import ListIcon from "@/src/components/icons/ListIcon";
import MagnifyingGlassIcon from "@/src/components/icons/MagnifyingGlassIcon";
import UserIcon from "@/src/components/icons/UserIcon";
import DropdownMenu from "@/src/components/core/dropdown-menu";
import SheetIcon from "@/src/components/icons/SheetIcon";
import { handleApiSuccessResponse } from "@/src/store/api/helper";
import PlusIcon from "@/src/components/icons/PlusIcon";
import FilterLinesIcon from "@/src/components/icons/FilterLinesIcon";
import DataTable from "@/src/components/core/data-table";
import { ColumnDef } from "@tanstack/react-table";
import TableHead from "@/src/components/core/table-head";
import StatusTag from "../assets/components/StatusTag";
import MemberCard from "./components/MemberCard";
import type { TMember, TData, TData2 } from "./types";

const backgroundColors = ["#FF9797", "#E3B439", "#32BA50", "#97AEFF"];
const members: TMember[] = [
  {
    name: "Daniel Oluwaseun",
    role: "Super Admin",
    id: "RFS-23409113",
    dateCreated: new Date(),
    status: "active",
  },
  {
    name: "John Doe",
    role: "Admin",
    id: "RFS-23409113",
    dateCreated: new Date(),
    status: "inactive",
  },
  {
    name: "Jane Matt",
    role: "Field Staff",
    id: "RFS-23409113",
    dateCreated: new Date(),
    status: "active",
  },
  {
    name: "Doe John",
    role: "Gateman",
    id: "RFS-23409113",
    dateCreated: new Date(),
    status: "inactive",
  },
  {
    name: "Babalola John",
    role: "Charge Agent",
    id: "RFS-23409113",
    dateCreated: new Date(),
    status: "active",
  },
  {
    name: "Daniel Oluwaseun",
    role: "Super Admin",
    id: "RFS-23409113",
    dateCreated: new Date(),
    status: "active",
  },
  {
    name: "John Doe",
    role: "Admin",
    id: "RFS-23409113",
    dateCreated: new Date(),
    status: "inactive",
  },
  {
    name: "Jane Matt",
    role: "Field Staff",
    id: "RFS-23409113",
    dateCreated: new Date(),
    status: "active",
  },
  {
    name: "Doe John",
    role: "Gateman",
    id: "RFS-23409113",
    dateCreated: new Date(),
    status: "inactive",
  },
  {
    name: "Babalola John",
    role: "Charge Agent",
    id: "RFS-23409113",
    dateCreated: new Date(),
    status: "active",
  },
  {
    name: "Daniel Oluwaseun",
    role: "Super Admin",
    id: "RFS-23409113",
    dateCreated: new Date(),
    status: "active",
  },
  {
    name: "John Doe",
    role: "Admin",
    id: "RFS-23409113",
    dateCreated: new Date(),
    status: "inactive",
  },
  {
    name: "Jane Matt",
    role: "Field Staff",
    id: "RFS-23409113",
    dateCreated: new Date(),
    status: "active",
  },
  {
    name: "Doe John",
    role: "Gateman",
    id: "RFS-23409113",
    dateCreated: new Date(),
    status: "inactive",
  },
  {
    name: "Babalola John",
    role: "Charge Agent",
    id: "RFS-23409113",
    dateCreated: new Date(),
    status: "active",
  },
];

const columns: ColumnDef<TMember>[] = [
  {
    accessorKey: "id",
    header: () => <TableHead name="Name" />,
    cell: ({ row }) => {
      const { name } = row.original;

      return (
        <div className="flex items-center space-x-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F1F5F8] text-wheels-primary">
            {getIntials(name)}
          </div>
          <span className="text-sm font-medium text-wheels-primary">
            {name}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "id",
    header: () => <TableHead name="User ID" />,
    cell: ({ row }) => {
      const { id } = row.original;

      return <span className="text-sm text-[#434956]">{id}</span>;
    },
  },
  {
    accessorKey: "role",
    header: () => <TableHead name="Role" />,
    cell: ({ row }) => {
      const { role } = row.original;

      return <span className="text-sm text-[#434956]">{role}</span>;
    },
  },
  {
    accessorKey: "dateCreated",
    header: () => <TableHead name="Created" />,
    cell: ({ row }) => {
      const { dateCreated } = row.original;

      return (
        <span className="text-sm text-wheels-primary">
          {format(dateCreated, "MMM d, yyyy h:mma")}
        </span>
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
];

export default function Team() {
  const [data, setData] = useQueryState<TData>(
    "data",
    parseAsJson<TData>().withDefault({
      view: "list",
    }),
  );

  const [data2, setData2] = useState<TData2>({
    openSheet: false,
    openMoreDropdown: false,
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

  function handleExportAssets() {
    handleApiSuccessResponse({
      message: "Data exported successfully",
    });
  }

  return (
    <section className="bg-white p-5">
      <div className="mb-8 flex items-start justify-between rounded-lg bg-gradient-blue p-4 shadow-shadow-1">
        <div>
          <div className="mb-2 flex items-center space-x-3">
            <h2 className="text-2xl font-bold text-wheels-primary lg:text-3xl">
              Reeddi
            </h2>
            <Image
              src="/assets/images/battery.png"
              width={30}
              height={30}
              alt="Battery"
            />
          </div>
          <p className="text-sm text-wheels-grey">
            See details of your team members
          </p>

          <div className="mt-5 inline-flex items-center space-x-1 rounded-sm bg-white p-1 text-xs font-medium uppercase text-wheels-grey">
            <UserIcon className="h-3 w-3" />
            <span>CHARGE AGENT: 25</span>
          </div>
        </div>

        <div className="hidden lg:flex lg:items-center">
          {members.slice(0, 4).map(({ name }, index) => (
            <div
              key={index}
              style={{
                backgroundColor: backgroundColors[index],
                marginLeft: index === 0 ? "0" : "-10px",
              }}
              className="flex h-10 w-10 items-center justify-center rounded-full">
              <span className="text-base font-semibold text-white">
                {getIntials(name)}
              </span>
            </div>
          ))}
        </div>
      </div>

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
                onClick={() => handleDataChange("view", value as TData["view"])}
                className={`p-2 ${index === 0 ? "rounded-bl-sm rounded-tl-sm" : "rounded-br-sm rounded-tr-sm"} ${data.view === value ? "bg-wheels-primary text-white" : "bg-wheels-grey-2 text-wheels-grey-3"}`}>
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
          <DropdownMenu
            open={data2.openMoreDropdown}
            onOpenChange={(value) =>
              handleData2Change("openMoreDropdown", value)
            }
            contentClassName="shadow-[0px_32px_64px_-12px_rgba(16,24,40,0.2)] py-5 px-3 w-[240px] rounded-md border border-[rgba(204,212,216,0.5)]">
            <div className="mr-3 flex items-center space-x-2.5 rounded-lg px-4 py-2.5 sm:mr-0">
              <FilterLinesIcon />

              <span className="text-sm font-medium text-wheels-primary">
                Filters
              </span>
            </div>

            <div className="w-full space-y-4">
              {/* <div
                role="button"
                className="flex cursor-pointer items-center space-x-2 lg:space-x-4">
                <InfoIcon />
                <span className="text-sm text-[rgba(85,112,126,1)]">
                  Report
                </span>
              </div> */}
            </div>
          </DropdownMenu>

          <button
            onClick={handleExportAssets}
            className="hidden items-center space-x-2.5 rounded-lg border border-wheels-grey-4 px-4 py-2.5 sm:flex">
            <SheetIcon />
            <span className="text-sm font-medium text-wheels-primary">
              Export
            </span>
          </button>

          <button
            onClick={() => handleData2Change("openSheet", !data2.openSheet)}
            className="flex items-center space-x-2 rounded-lg bg-wheels-primary px-4 py-2.5 text-white">
            <PlusIcon />
            <span className="text-sm font-medium">Add New</span>
          </button>
        </div>
      </div>

      <div className="mt-10">
        {data.view === "list" ? (
          <DataTable
            data={members}
            columns={columns}
            rowSelection={data2.rowSelection}
            setRowSelection={(value: TMember) =>
              handleData2Change("rowSelection", value)
            }
          />
        ) : (
          <div className="grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {members.map((member, index) => (
              <MemberCard key={index} {...member} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
