"use client";
import { useState } from "react";
import { format } from "date-fns";
import { parseAsJson, useQueryState } from "nuqs";
import { getIntials } from "@/src/lib/utils";
import Pagination from "@/src/components/common/Pagination";
import StatCard from "@/src/components/common/StatCard";
import CapsuleIcon from "@/src/components/icons/CapsuleIcon";
import MagnifyingGlassIcon from "@/src/components/icons/MagnifyingGlassIcon";
import UserIcon from "@/src/components/icons/UserIcon";
import ListIcon from "@/src/components/icons/ListIcon";
import GridIcon from "@/src/components/icons/GridIcon";
import { Button } from "@/src/components/core/button";
import SheetIcon from "@/src/components/icons/SheetIcon";
import { handleApiSuccessResponse } from "@/src/store/api/helper";
import DataTable from "@/src/components/core/data-table";
import UserCard from "@/src/components/common/UserCard";
import PlusIcon from "@/src/components/icons/PlusIcon";
import TableHead from "@/src/components/core/table-head";
import { ColumnDef } from "@tanstack/react-table";
import StatusTag from "@/src/components/common/StatusTag";
import type { TData, TData2 } from "./types";
import Sheet from "@/src/components/core/sheet";
import CustomerForm from "./components/CustomerForm";
import CustomerProfile from "./components/CustomerProfile";

const customers: TData2["customer"][] = [
  {
    _id: "6662ea4f8033d085087e0ebf",
    firstName: "kslakals",
    email: "customer3@gmail.com",
    lastName: "laslakslakslas",
    phoneOrEmailVerified: false,
    role: "customer",
    address: "lklkwlwlkwlkwlqkw",
    status: "active",
    phoneNumber: "+2347016040891",
    gender: "Male",
    onBoardedBy: "6655a7a800dccdd77a6b77ec",
    passportPhotograph: "6662ea468033d085087e0ebc",
    idCard: "6662ea0b8033d085087e0eb6",
    addressProof: "6662ea168033d085087e0eba",
    createdAt: "2024-06-07T11:09:03.635Z",
    updatedAt: "2024-06-07T11:09:03.635Z",
    userUID: "UNK795956",
    fullName: "kslakals laslakslakslas",
    id: "6662ea4f8033d085087e0ebf",
  },
  {
    _id: "66633411f8b9f248c53ad34e",
    firstName: "lasu",
    email: "customer3@gmail.com",
    lastName: "lasu",
    phoneOrEmailVerified: false,
    role: "customer",
    address: "jsakajskajskjasjaksj",
    status: "active",
    phoneNumber: "+2347016848584",
    gender: "Male",
    onBoardedBy: "66633167f8b9f248c53ad328",
    passportPhotograph: "666333bbf8b9f248c53ad34b",
    idCard: "666333a3f8b9f248c53ad347",
    addressProof: "666333abf8b9f248c53ad349",
    createdAt: "2024-06-07T16:23:45.280Z",
    updatedAt: "2024-06-07T16:23:45.280Z",
    userUID: "UNK322238",
    fullName: "lasu lasu",
    id: "66633411f8b9f248c53ad34e",
  },
  {
    _id: "66707ae46fd22bdcf05fd3f0",
    firstName: "daniella",
    email: "daniellaoti99@gmail.com",
    lastName: "oti",
    phoneOrEmailVerified: false,
    role: "customer",
    address: "17samuel street",
    status: "inactive",
    phoneNumber: "+2349043844441",
    gender: "Female",
    onBoardedBy: "6655a7a800dccdd77a6b77ec",
    passportPhotograph: "66707ad76fd22bdcf05fd3ed",
    idCard: "66707aa76fd22bdcf05fd3e9",
    addressProof: "66707ac86fd22bdcf05fd3eb",
    createdAt: "2024-06-17T18:05:24.853Z",
    updatedAt: "2024-06-17T18:05:24.853Z",
    userUID: "UNK158645",
    fullName: "daniella oti",
    id: "66707ae46fd22bdcf05fd3f0",
  },
  {
    _id: "667da37c2a75377992ff5b40",
    firstName: "vanessa",
    email: "daniellaoti12@gmail.com",
    lastName: "johnson",
    phoneOrEmailVerified: false,
    role: "customer",
    address: "14 daniella street",
    status: "active",
    phoneNumber: "+2347043842150",
    gender: "Female",
    onBoardedBy: "6655a7a800dccdd77a6b77ec",
    passportPhotograph: "667da3202a75377992ff5b39",
    idCard: "667da3082a75377992ff5b35",
    addressProof: "667da30f2a75377992ff5b37",
    createdAt: "2024-06-27T17:38:04.990Z",
    updatedAt: "2024-06-27T17:38:04.990Z",
    userUID: "UNK83827",
    fullName: "vanessa johnson",
    id: "667da37c2a75377992ff5b40",
  },
  {
    _id: "668fa532ac0948458f0fd7f1",
    firstName: "aliu",
    email: "aliuozi247+custome1@gmail.com",
    lastName: "omeiza",
    phoneOrEmailVerified: false,
    role: "customer",
    address: "veslora estate",
    status: "active",
    phoneNumber: "+2348183423095",
    gender: "Male",
    onBoardedBy: "668fa06aac0948458f0fd7a9",
    passportPhotograph: "668fa50eac0948458f0fd7ee",
    idCard: "668fa419ac0948458f0fd7ea",
    addressProof: "668fa4ebac0948458f0fd7ec",
    createdAt: "2024-07-11T09:26:10.320Z",
    updatedAt: "2024-07-11T09:26:10.320Z",
    userUID: "UNK338437",
    fullName: "aliu omeiza",
    id: "668fa532ac0948458f0fd7f1",
  },
  {
    _id: "6662ea4f8033d085087e0ebf",
    firstName: "kslakals",
    email: "customer3@gmail.com",
    lastName: "laslakslakslas",
    phoneOrEmailVerified: false,
    role: "customer",
    address: "lklkwlwlkwlkwlqkw",
    status: "active",
    phoneNumber: "+2347016040891",
    gender: "Male",
    onBoardedBy: "6655a7a800dccdd77a6b77ec",
    passportPhotograph: "6662ea468033d085087e0ebc",
    idCard: "6662ea0b8033d085087e0eb6",
    addressProof: "6662ea168033d085087e0eba",
    createdAt: "2024-06-07T11:09:03.635Z",
    updatedAt: "2024-06-07T11:09:03.635Z",
    userUID: "UNK795956",
    fullName: "kslakals laslakslakslas",
    id: "6662ea4f8033d085087e0ebf",
  },
  {
    _id: "66633411f8b9f248c53ad34e",
    firstName: "lasu",
    email: "customer3@gmail.com",
    lastName: "lasu",
    phoneOrEmailVerified: false,
    role: "customer",
    address: "jsakajskajskjasjaksj",
    status: "active",
    phoneNumber: "+2347016848584",
    gender: "Male",
    onBoardedBy: "66633167f8b9f248c53ad328",
    passportPhotograph: "666333bbf8b9f248c53ad34b",
    idCard: "666333a3f8b9f248c53ad347",
    addressProof: "666333abf8b9f248c53ad349",
    createdAt: "2024-06-07T16:23:45.280Z",
    updatedAt: "2024-06-07T16:23:45.280Z",
    userUID: "UNK322238",
    fullName: "lasu lasu",
    id: "66633411f8b9f248c53ad34e",
  },
  {
    _id: "66707ae46fd22bdcf05fd3f0",
    firstName: "daniella",
    email: "daniellaoti99@gmail.com",
    lastName: "oti",
    phoneOrEmailVerified: false,
    role: "customer",
    address: "17samuel street",
    status: "active",
    phoneNumber: "+2349043844441",
    gender: "Female",
    onBoardedBy: "6655a7a800dccdd77a6b77ec",
    passportPhotograph: "66707ad76fd22bdcf05fd3ed",
    idCard: "66707aa76fd22bdcf05fd3e9",
    addressProof: "66707ac86fd22bdcf05fd3eb",
    createdAt: "2024-06-17T18:05:24.853Z",
    updatedAt: "2024-06-17T18:05:24.853Z",
    userUID: "UNK158645",
    fullName: "daniella oti",
    id: "66707ae46fd22bdcf05fd3f0",
  },
  {
    _id: "667da37c2a75377992ff5b40",
    firstName: "vanessa",
    email: "daniellaoti12@gmail.com",
    lastName: "johnson",
    phoneOrEmailVerified: false,
    role: "customer",
    address: "14 daniella street",
    status: "active",
    phoneNumber: "+2347043842150",
    gender: "Female",
    onBoardedBy: "6655a7a800dccdd77a6b77ec",
    passportPhotograph: "667da3202a75377992ff5b39",
    idCard: "667da3082a75377992ff5b35",
    addressProof: "667da30f2a75377992ff5b37",
    createdAt: "2024-06-27T17:38:04.990Z",
    updatedAt: "2024-06-27T17:38:04.990Z",
    userUID: "UNK83827",
    fullName: "vanessa johnson",
    id: "667da37c2a75377992ff5b40",
  },
  {
    _id: "668fa532ac0948458f0fd7f1",
    firstName: "aliu",
    email: "aliuozi247+custome1@gmail.com",
    lastName: "omeiza",
    phoneOrEmailVerified: false,
    role: "customer",
    address: "veslora estate",
    status: "active",
    phoneNumber: "+2348183423095",
    gender: "Male",
    onBoardedBy: "668fa06aac0948458f0fd7a9",
    passportPhotograph: "668fa50eac0948458f0fd7ee",
    idCard: "668fa419ac0948458f0fd7ea",
    addressProof: "668fa4ebac0948458f0fd7ec",
    createdAt: "2024-07-11T09:26:10.320Z",
    updatedAt: "2024-07-11T09:26:10.320Z",
    userUID: "UNK338437",
    fullName: "aliu omeiza",
    id: "668fa532ac0948458f0fd7f1",
  },
];

export default function Customers() {
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
    customer: {} as TData2["customer"],
  });

  const columns: ColumnDef<TData2["customer"]>[] = [
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
      accessorKey: "rentalsMade",
      header: () => <TableHead name="Rentals Made" />,
      cell: ({ row }) => {
        // TODO - Get rentals made

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
      accessorKey: "status",
      header: () => <TableHead name="Status" />,
      cell: ({
        row: {
          original: { status },
        },
      }) => {
        return <StatusTag status={status} />;
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

  function handleExportCustomers() {
    handleApiSuccessResponse({
      message: "Data exported successfully",
    });
  }

  function toggleSheet() {
    setData2({ ...data2, openSheet: !data2.openSheet });
  }

  function handleSheet(sheetType: TData2["sheetType"], id?: string) {
    let customer = customers.find((amb) => amb.id === id);
    console.log(customer);

    if (sheetType === "edit" && !customer) {
      handleApiSuccessResponse({
        message: "Customer not found",
      });

      return;
    }

    if ((sheetType === "edit" || sheetType === "view") && customer) {
      setData2({ ...data2, customer, openSheet: true, sheetType });
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
            description="Total Customers"
          />
          <StatCard
            icon={<CapsuleIcon />}
            iconClass="bg-[#F59E0B]"
            value={548}
            description="Total Rentals"
          />
          <StatCard
            icon={<CapsuleIcon />}
            iconClass="bg-[#5654D1]"
            value={123}
            description="Total Systems Returned"
          />
          <StatCard
            icon={<CapsuleIcon />}
            iconClass="bg-[#47A4E9]"
            value={4}
            description="Late Returns"
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
                onClick={handleExportCustomers}
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
                data={customers}
                columns={columns}
                rowSelection={data2.rowSelection}
                setRowSelection={(value: TData2["customer"]) =>
                  handleData2Change("rowSelection", value)
                }
              />
            ) : (
              <div className="grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                {customers.map((customer, index) => (
                  <UserCard
                    key={index}
                    phoneNumber={customer.phoneNumber}
                    status={customer.status}
                    name={customer.fullName}
                    dateCreated={customer.createdAt}
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
          <CustomerForm />
        )}
        {data2.sheetType === "view" && (
          <CustomerProfile customer={data2.customer} />
        )}
      </Sheet>
    </>
  );
}
