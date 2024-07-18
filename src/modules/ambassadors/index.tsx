"use client";
import { useState } from "react";
import { parseAsJson, useQueryState } from "nuqs";
import _debounce from "lodash/debounce";
import { format } from "date-fns/format";
import {
  useGetAmbassadorsStatsQuery,
  useGetAmbassadorsQuery,
} from "@/src/store/api/ambassadors";
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
import UserCard from "@/src/components/common/UserCard";
import Sheet from "@/src/components/core/sheet";
import AmbassadorProfile from "./components/AmbassadorProfile";
import AmbassadorForm from "./components/AmbassadorForm";
import { handleApiSuccessResponse } from "@/src/store/api/helper";
import SearchInput from "@/src/components/common/SearchInput";
import CapsuleIcon from "@/src/components/icons/CapsuleIcon";
import ViewType from "@/src/components/common/ViewType";
import LoadingEllipsis from "@/src/components/core/loaders/LoadingEllipsis";
import type { TAmbassador } from "@/src/store/types/ambassadors";
import type { TData, TData2 } from "./types";

export default function Ambassadors() {
  const [data, setData] = useQueryState<TData>(
    "params",
    parseAsJson<TData>().withDefault({
      view: "list",
    }),
  );

  const [data2, setData2] = useState<TData2>({
    openSheet: false,
    rowSelection: {} as TData2["rowSelection"],
    sheetType: "add",
    ambassador: {} as TData2["ambassador"],
    searchValue: "",
  });

  const { data: stats } = useGetAmbassadorsStatsQuery();
  const { data: ambassadorsData, isLoading } = useGetAmbassadorsQuery({
    page: data.page,
    search: data.search,
  });

  const columns: ColumnDef<TAmbassador>[] = [
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
      accessorKey: "completedRentals",
      header: () => <TableHead name="Completed Rentals" />,
      cell: ({
        row: {
          original: { rentalsCompleted },
        },
      }) => {
        return (
          <span className="text-sm text-[#434956]">{rentalsCompleted}</span>
        );
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
      cell: ({
        row: {
          original: { customersOnboarded },
        },
      }) => {
        return <span>{customersOnboarded}</span>;
      },
    },
    {
      accessorKey: "createdAt",
      header: () => <TableHead name="Date Created" />,
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

  function handleExportAmbassadors() {
    handleApiSuccessResponse({
      message: "Data exported successfully",
    });
  }

  function toggleSheet() {
    setData2({ ...data2, openSheet: !data2.openSheet });
  }

  function handleSheet(sheetType: TData2["sheetType"], id?: string) {
    let ambassador = ambassadorsData?.docs.find((amb) => amb._id === id);
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
        <div className="mb-8 grid grid-cols-1 gap-y-5 sm:grid-cols-2 sm:gap-x-5 lg:grid-cols-3">
          <StatCard
            icon={<UserIcon className="text-white" />}
            iconClass="bg-[#10B981]"
            value={stats?.ambasssadorTotal || 0}
            description="Total Ambassadors"
          />
          <StatCard
            icon={<CapsuleIcon />}
            iconClass="bg-[#F59E0B]"
            value={stats?.rentalTotal || 0}
            description="Total Rentals"
          />
          <StatCard
            icon={<UserIcon className="text-white" />}
            iconClass="bg-[#5654D1]"
            value={stats?.customerTotal || 0}
            description="Customers Onboarded"
          />
        </div>

        <div className="rounded-md bg-white py-5">
          <div className="flex flex-col space-y-5 px-5 md:flex-row md:items-center md:justify-between md:space-x-3 md:space-y-0">
            <div className="flex w-full sm:space-x-5 md:w-[44%] md:items-center xl:w-[65%]">
              <ViewType
                handleDataChange={(key, value) =>
                  handleDataChange(key as keyof TData, value)
                }
              />

              <SearchInput
                onChange={(searchValue) =>
                  handleDataChange("search", searchValue)
                }
              />
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

          {isLoading ? (
            <LoadingEllipsis
              withText
              customText="Fetching Ambassadors"
              className="h-[50vh] lg:text-base"
            />
          ) : (
            <>
              <div className="mt-5">
                {data.view === "list" ? (
                  <DataTable
                    data={ambassadorsData?.docs || []}
                    columns={columns}
                    rowSelection={data2.rowSelection}
                    setRowSelection={(value: TData2["ambassador"]) =>
                      handleData2Change("rowSelection", value)
                    }
                  />
                ) : (
                  <div className="grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                    {ambassadorsData &&
                      ambassadorsData.docs.map((ambassador, index) => (
                        <UserCard
                          key={index}
                          status={"active"}
                          name={
                            ambassador.firstName + " " + ambassador.lastName
                          }
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
                pageCount={ambassadorsData?.totalPages || 0}
                onPageChange={(page) => {
                  handleDataChange("page", page + 1);
                }}
              />
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
          <AmbassadorForm
            close={toggleSheet}
            type={data2.sheetType}
            ambassador={data2.ambassador}
          />
        )}
        {data2.sheetType === "view" && (
          <AmbassadorProfile ambassador={data2.ambassador} />
        )}
      </Sheet>
    </>
  );
}
