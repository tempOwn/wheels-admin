"use client";
import { useState } from "react";
import { format } from "date-fns";
import { parseAsJson, useQueryState } from "nuqs";
import { getIntials } from "@/src/lib/utils";
import Pagination from "@/src/components/common/Pagination";
import StatCard from "@/src/components/common/StatCard";
import CapsuleIcon from "@/src/components/icons/CapsuleIcon";
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
import {
  useGetAllCustomersQuery,
  useGetCustomersStatsQuery,
} from "@/src/store/api/customer";
import SearchInput from "@/src/components/common/SearchInput";
import LoadingEllipsis from "@/src/components/loaders/LoadingEllipsis";

export default function Customers() {
  const [data, setData] = useQueryState<TData>(
    "data",
    parseAsJson<TData>().withDefault({
      view: "list",
      search: "",
    }),
  );

  const { data: customerData, isLoading } = useGetAllCustomersQuery({
    page: data.page,
    search: data.search,
  });

  const { data: customerStats } = useGetCustomersStatsQuery();

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
          original: { firstName, lastName },
        },
      }) => {
        return (
          <div className="flex items-center space-x-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F1F5F8] uppercase text-wheels-primary">
              {getIntials(firstName + " " + lastName)}
            </div>
            <span className="text-sm font-medium capitalize text-wheels-primary">
              {firstName + " " + lastName}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "rentalsMade",
      header: () => <TableHead name="Rentals Made" />,
      cell: ({
        row: {
          original: { rentalsMade },
        },
      }) => {
        return <span className="text-sm text-[#434956]">{rentalsMade}</span>;
      },
    },
    {
      accessorKey: "topSystemRented",
      header: () => <TableHead name="Top System Rented" />,
      cell: ({
        row: {
          original: { energy_box, big_energy, capsule },
        },
      }) => {
        // TODO - Get top system rented
        return (
          <span className="text-sm text-wheels-primary">Reeddi Capsules</span>
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
          original: { _id },
        },
      }) => {
        return (
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              onClick={handleSheet.bind(null, "view", _id)}
              className="h-auto p-0 text-wheels-primary hover:underline">
              View
            </Button>
            <Button
              variant="ghost"
              onClick={handleSheet.bind(null, "edit", _id)}
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
    let customer =
      customerData && customerData.docs.find((amb) => amb._id === id);

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
        <div className="mb-8 grid grid-cols-1 gap-y-5 sm:grid-cols-2 sm:gap-x-5 lg:grid-cols-3">
          <StatCard
            icon={<UserIcon className="text-white" />}
            iconClass="bg-[#10B981]"
            value={customerStats?.customerTotal || 0}
            description="Total Customers"
          />
          <StatCard
            icon={<CapsuleIcon />}
            iconClass="bg-[#F59E0B]"
            value={customerStats?.rentalTotal || 0}
            description="Total Rentals"
          />
          <StatCard
            icon={<CapsuleIcon />}
            iconClass="bg-[#5654D1]"
            value={customerStats?.assetsReturnedTotal || 0}
            description="Total Systems Returned"
          />
          {/* <StatCard
            icon={<CapsuleIcon />}
            iconClass="bg-[#47A4E9]"
            value={0}
            description="Late Returns"
          /> */}
        </div>

        <div className="rounded-md bg-white py-5">
          <div className="flex flex-col space-y-5 px-5 md:flex-row md:items-center md:justify-between md:space-x-3 md:space-y-0">
            <div className="mb-2 flex w-full sm:space-x-5 md:w-[44%] md:items-center xl:w-[65%]">
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

              <SearchInput
                onChange={(searchValue) =>
                  handleDataChange("search", searchValue)
                }
              />
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
          {isLoading ? (
            <LoadingEllipsis
              withText
              customText="Loading Customers"
              className="h-[50vh] lg:text-base"
            />
          ) : (
            <>
              {customerData && customerData.docs.length > 0 && (
                <>
                  <div className="mt- 5">
                    {data.view === "list" ? (
                      <DataTable
                        data={customerData?.docs}
                        columns={columns}
                        rowSelection={data2.rowSelection}
                        setRowSelection={(value: TData2["customer"]) =>
                          handleData2Change("rowSelection", value)
                        }
                      />
                    ) : (
                      <div className="grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                        {customerData?.docs.map((customer, index) => (
                          <UserCard
                            key={index}
                            phoneNumber={customer.phoneNumber}
                            status={customer.status}
                            name={`${customer.firstName} ${customer.lastName}`}
                            dateCreated={customer.createdAt}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  <Pagination
                    className="px-5"
                    initialPage={data.page ? data.page - 1 : 0}
                    pageCount={customerData.totalPages} // TODO - replace with actual data from api
                    totalDataLength={customerData.totalDocs} // TODO - replace with actual data from api
                    currentRange={{
                      start: customerData.page,
                      end: customerData.totalPages,
                    }} // TODO - replace with actual data from api
                    onPageChange={(page) => {
                      handleDataChange("page", page + 1);
                    }}
                  />
                </>
              )}
            </>
          )}
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
