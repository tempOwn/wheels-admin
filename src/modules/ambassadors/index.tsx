"use client";
import { useState } from "react";
import { parseAsJson, useQueryState } from "nuqs";
import { format } from "date-fns";
import { getIntials } from "@/src/lib/utils";
import StatCard from "@/src/components/common/StatCard";
import UserIcon from "@/src/components/icons/UserIcon";
import DataTable from "@/src/components/core/data-table";
import { ColumnDef } from "@tanstack/react-table";
import TableHead from "@/src/components/core/table-head";
import { Button } from "@/src/components/core/button";
import Pagination from "@/src/components/common/Pagination";
import SheetIcon from "@/src/components/icons/SheetIcon";
import PlusIcon from "@/src/components/icons/PlusIcon";
import MagnifyingGlassIcon from "@/src/components/icons/MagnifyingGlassIcon";
import ListIcon from "@/src/components/icons/ListIcon";
import GridIcon from "@/src/components/icons/GridIcon";
import UserCard from "@/src/components/common/UserCard";
import Sheet from "@/src/components/core/sheet";
import AmbassadorDetails from "./components/AmbassadorDetails";
import AmbassadorForm from "./components/AmbassadorForm";
import { handleApiSuccessResponse } from "@/src/store/api/helper";
import CapsuleIcon from "@/src/components/icons/CapsuleIcon";
import type { TData, TData2 } from "./types";

const ambassadors: TData2["ambassador"][] = [
  {
    _id: "663226c5ad509bbd8167a813",
    firstName: "kelvin",
    lastName: "oigiangbe",
    role: "ambassador",
    email: "kelvinstar49@gmail.com",
    address: "string",
    status: "active",
    phoneNumber: "+2347033445286",
    gender: "string",
    createdAt: "2024-05-01T11:25:57.425Z",
    updatedAt: "2024-06-07T16:16:33.558Z",
    userUID: "AMD306423",
    phoneOrEmailVerified: true,
    fullName: "kelvin oigiangbe",
    id: "663226c5ad509bbd8167a813",
  },
  {
    _id: "6655a7a800dccdd77a6b77ec",
    firstName: "taiwo",
    email: "taiwokenny45@gmail.com",
    lastName: "taiwo",
    phoneOrEmailVerified: true,
    role: "ambassador",
    address: "string",
    status: "active",
    phoneNumber: "+2349161639544",
    gender: "male",
    createdAt: "2024-05-28T09:45:12.227Z",
    updatedAt: "2024-06-17T13:44:20.885Z",
    userUID: "AMD699057",
    fullName: "taiwo taiwo",
    id: "6655a7a800dccdd77a6b77ec",
  },
  {
    _id: "6659c1a28033d085087e0e5a",
    firstName: "aliu",
    email: "aliuom1996@gmail.com",
    lastName: "omeiza",
    phoneOrEmailVerified: false,
    role: "ambassador",
    address: "lagos",
    status: "active",
    phoneNumber: "+2348183423095",
    gender: "male",
    createdAt: "2024-05-31T12:25:06.385Z",
    updatedAt: "2024-05-31T12:25:06.385Z",
    userUID: "AMD343733",
    fullName: "aliu omeiza",
    id: "6659c1a28033d085087e0e5a",
  },
  {
    _id: "6659c1dc8033d085087e0e5e",
    firstName: "damilola",
    email: "damilola.idowu@reeddi.com",
    lastName: "idowu",
    phoneOrEmailVerified: true,
    role: "ambassador",
    address: "lagos",
    status: "active",
    phoneNumber: "+2347026295146",
    gender: "female",
    createdAt: "2024-05-31T12:26:04.696Z",
    updatedAt: "2024-05-31T12:39:43.809Z",
    userUID: "AMD236188",
    fullName: "damilola idowu",
    id: "6659c1dc8033d085087e0e5e",
  },
  {
    _id: "66633167f8b9f248c53ad328",
    firstName: "kelvin",
    email: "oigiangbekelvin@gmail.com",
    lastName: "oigiangbe",
    phoneOrEmailVerified: false,
    role: "ambassador",
    address: "string",
    status: "active",
    phoneNumber: "+2347033445286",
    gender: "male",
    createdAt: "2024-06-07T16:12:23.916Z",
    updatedAt: "2024-06-07T16:17:05.990Z",
    userUID: "AMD966121",
    fullName: "kelvin oigiangbe",
    id: "66633167f8b9f248c53ad328",
  },
  {
    _id: "668fa06aac0948458f0fd7a9",
    firstName: "aliu",
    email: "aliuozi247@gmail.com",
    lastName: "aliu",
    phoneOrEmailVerified: true,
    role: "ambassador",
    address: "string",
    status: "active",
    phoneNumber: "+2349013321284",
    gender: "male",
    createdAt: "2024-07-11T09:05:46.942Z",
    updatedAt: "2024-07-11T09:17:29.482Z",
    userUID: "AMD375813",
    fullName: "aliu aliu",
    id: "668fa06aac0948458f0fd7a9",
  },
  {
    _id: "663226c5ad509bbd8167a813",
    firstName: "kelvin",
    lastName: "oigiangbe",
    role: "ambassador",
    email: "kelvinstar49@gmail.com",
    address: "string",
    status: "active",
    phoneNumber: "+2347033445286",
    gender: "string",
    createdAt: "2024-05-01T11:25:57.425Z",
    updatedAt: "2024-06-07T16:16:33.558Z",
    userUID: "AMD306423",
    phoneOrEmailVerified: true,
    fullName: "kelvin oigiangbe",
    id: "663226c5ad509bbd8167a813",
  },
  {
    _id: "6655a7a800dccdd77a6b77ec",
    firstName: "taiwo",
    email: "taiwokenny45@gmail.com",
    lastName: "taiwo",
    phoneOrEmailVerified: true,
    role: "ambassador",
    address: "string",
    status: "active",
    phoneNumber: "+2349161639544",
    gender: "male",
    createdAt: "2024-05-28T09:45:12.227Z",
    updatedAt: "2024-06-17T13:44:20.885Z",
    userUID: "AMD699057",
    fullName: "taiwo taiwo",
    id: "6655a7a800dccdd77a6b77ec",
  },
  {
    _id: "6659c1a28033d085087e0e5a",
    firstName: "aliu",
    email: "aliuom1996@gmail.com",
    lastName: "omeiza",
    phoneOrEmailVerified: false,
    role: "ambassador",
    address: "lagos",
    status: "active",
    phoneNumber: "+2348183423095",
    gender: "male",
    createdAt: "2024-05-31T12:25:06.385Z",
    updatedAt: "2024-05-31T12:25:06.385Z",
    userUID: "AMD343733",
    fullName: "aliu omeiza",
    id: "6659c1a28033d085087e0e5a",
  },
  {
    _id: "6659c1dc8033d085087e0e5e",
    firstName: "damilola",
    email: "damilola.idowu@reeddi.com",
    lastName: "idowu",
    phoneOrEmailVerified: true,
    role: "ambassador",
    address: "lagos",
    status: "active",
    phoneNumber: "+2347026295146",
    gender: "female",
    createdAt: "2024-05-31T12:26:04.696Z",
    updatedAt: "2024-05-31T12:39:43.809Z",
    userUID: "AMD236188",
    fullName: "damilola idowu",
    id: "6659c1dc8033d085087e0e5e",
  },
  {
    _id: "66633167f8b9f248c53ad328",
    firstName: "kelvin",
    email: "oigiangbekelvin@gmail.com",
    lastName: "oigiangbe",
    phoneOrEmailVerified: false,
    role: "ambassador",
    address: "string",
    status: "active",
    phoneNumber: "+2347033445286",
    gender: "male",
    createdAt: "2024-06-07T16:12:23.916Z",
    updatedAt: "2024-06-07T16:17:05.990Z",
    userUID: "AMD966121",
    fullName: "kelvin oigiangbe",
    id: "66633167f8b9f248c53ad328",
  },
  {
    _id: "668fa06aac0948458f0fd7a9",
    firstName: "aliu",
    email: "aliuozi247@gmail.com",
    lastName: "aliu",
    phoneOrEmailVerified: true,
    role: "ambassador",
    address: "string",
    status: "active",
    phoneNumber: "+2349013321284",
    gender: "male",
    createdAt: "2024-07-11T09:05:46.942Z",
    updatedAt: "2024-07-11T09:17:29.482Z",
    userUID: "AMD375813",
    fullName: "aliu aliu",
    id: "668fa06aac0948458f0fd7a9",
  },
];

export default function Ambassadors() {
  const [data, setData] = useQueryState<TData>(
    "data",
    parseAsJson<TData>().withDefault({
      view: "list",
    }),
  );

  const [data2, setData2] = useState<TData2>({
    openSheet: false,
    rowSelection: {} as TData2["rowSelection"],
    sheetType: "add",
    ambassador: {} as TData2["ambassador"],
  });

  const columns: ColumnDef<TData2["ambassador"]>[] = [
    {
      accessorKey: "name",
      header: () => <TableHead name="Name" />,
      cell: ({
        row: {
          original: { fullName },
        },
      }) => {
        return (
          <div className="flex items-center space-x-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F1F5F8] uppercase text-wheels-primary">
              {getIntials(fullName)}
            </div>
            <span className="text-sm font-medium capitalize text-wheels-primary">
              {fullName}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "completedRentals",
      header: () => <TableHead name="Completed Rentals" />,
      cell: ({ row }) => {
        // TODO - Get completed rentals

        return <span className="text-sm text-[#434956]">20</span>;
      },
    },
    {
      accessorKey: "topSystemRented",
      header: () => <TableHead name="Top System Rented" />,
      cell: ({ row }) => {
        // TODO - Get top system rented

        return (
          <span className="text-sm text-wheels-primary">Reeddi Capsule</span>
        );
      },
    },
    {
      accessorKey: "customerOnboarded",
      header: () => <TableHead name="Customer Onboarded" />,
      cell: ({ row }) => {
        // TODO - Get customer onboarded

        return <span>12</span>;
      },
    },
    {
      accessorKey: "createdAt",
      header: () => <TableHead name="Customer Onboarded" />,
      cell: ({
        row: {
          original: { createdAt },
        },
      }) => {
        return <span>{format(new Date(createdAt), "dd/MM/yyyy")}</span>;
      },
    },
    {
      accessorKey: "actions",
      header: () => <TableHead name="Actions" />,
      cell: ({
        row: {
          original: { id },
        },
      }) => {
        return (
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              onClick={handleSheet.bind(null, "view", id)}
              className="h-auto p-0 text-wheels-primary hover:underline">
              View
            </Button>
            <Button
              variant="ghost"
              onClick={handleSheet.bind(null, "edit", id)}
              className="h-auto p-0 text-wheels-primary hover:underline">
              Edit
            </Button>
          </div>
        );
      },
    },
  ];

  function handleDataChange(key: keyof TData, value: TData[keyof TData]) {
    setData({ ...data, [key]: value });
  }

  function handleData2Change(
    key: keyof typeof data2,
    value: (typeof data2)[keyof typeof data2],
  ) {
    setData2({ ...data2, [key]: value });
  }

  function handleExportAmbassadors() {
    handleApiSuccessResponse({
      message: "Data exported successfully",
    });
  }

  function toggleSheet() {
    setData2({ ...data2, openSheet: !data2.openSheet });
  }

  function handleSheet(sheetType: TData2["sheetType"], id?: string) {
    let ambassador = ambassadors.find((amb) => amb.id === id);
    console.log(ambassador);

    if (sheetType === "edit" && !ambassador) {
      handleApiSuccessResponse({
        message: "Ambassador not found",
      });

      return;
    }

    if ((sheetType === "edit" || sheetType === "view") && ambassador) {
      setData2({ ...data2, ambassador, openSheet: true, sheetType });
      return;
    }

    setData2({ ...data2, openSheet: true, sheetType });
  }

  return (
    <>
      <section className="p-5">
        <div className="mb-8 grid grid-cols-1 gap-y-5 sm:grid-cols-2 sm:gap-x-5 lg:grid-cols-4">
          <StatCard
            icon={<UserIcon className="text-white" />}
            iconClass="bg-[#10B981]"
            value={200}
            description="Total Ambassadors"
          />
          <StatCard
            icon={<CapsuleIcon />}
            iconClass="bg-[#F59E0B]"
            value={548}
            description="Total Rentals"
          />
          <StatCard
            icon={<UserIcon className="text-white" />}
            iconClass="bg-[#5654D1]"
            value={123}
            description="Customers Onboarded"
          />
          <StatCard
            icon={<CapsuleIcon />}
            iconClass="bg-[#47A4E9]"
            value="120 KgCO2"
            description="Total Emission saved"
          />
        </div>

        <div className="rounded-md bg-white py-5">
          <div className="flex flex-col space-y-5 px-5 md:flex-row md:items-center md:justify-between md:space-x-3 md:space-y-0">
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
              <Button
                onClick={handleExportAmbassadors}
                variant="ghost"
                className="flex items-center space-x-2.5 rounded-lg border border-wheels-grey-4 px-4 py-2.5">
                <SheetIcon />
                <span className="text-sm font-medium text-wheels-primary">
                  Export
                </span>
              </Button>

              <Button
                onClick={() => handleSheet("add")}
                className="flex items-center space-x-2">
                <PlusIcon />
                <span className="text-sm font-medium">Add New</span>
              </Button>
            </div>
          </div>

          <div className="mt-5">
            {data.view === "list" ? (
              <DataTable
                data={ambassadors}
                columns={columns}
                rowSelection={data2.rowSelection}
                setRowSelection={(value: TData2["ambassador"]) =>
                  handleData2Change("rowSelection", value)
                }
              />
            ) : (
              <div className="grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                {ambassadors.map((ambassador, index) => (
                  <UserCard
                    key={index}
                    status={ambassador.status}
                    name={ambassador.fullName}
                    phone={ambassador.phoneNumber}
                    dateCreated={ambassador.createdAt}
                  />
                ))}
              </div>
            )}
          </div>

          <Pagination
            className="px-5"
            initialPage={data.page ? data.page - 1 : 0}
            pageCount={10} // TODO - replace with actual data from api
            totalDataLength={200} // TODO - replace with actual data from api
            currentRange={{ start: 1, end: 10 }} // TODO - replace with actual data from api
            onPageChange={(page) => {
              handleDataChange("page", page + 1);
            }}
          />
        </div>
      </section>

      <Sheet
        open={data2.openSheet}
        onOpenChange={() => handleData2Change("openSheet", !data2.openSheet)}
        className="w-full max-w-full px-0 pb-0 md:max-w-[520px]"
        showCloseButton>
        {(data2.sheetType === "add" || data2.sheetType === "edit") && (
          <AmbassadorForm
            close={toggleSheet}
            type={data2.sheetType}
            ambassador={data2.ambassador}
          />
        )}
        {data2.sheetType === "view" && (
          <AmbassadorDetails ambassador={data2.ambassador} />
        )}
      </Sheet>
    </>
  );
}
