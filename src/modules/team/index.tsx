"use client";
import { useState } from "react";
import { parseAsJson, useQueryState } from "nuqs";
import { format } from "date-fns/format";
import Image from "next/image";
import { getIntials } from "@/src/lib/utils";
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
import Sheet from "@/src/components/core/sheet";
import TeamMemberForm from "./components/TeamMemberForm";
import { Button } from "@/src/components/core/button";
import TeamMemberProfile from "./components/TeamMemberProfile";
import Pagination from "@/src/components/common/Pagination";
import UserCard from "@/src/components/common/UserCard";
import { useGetAllTeamMembersQuery } from "@/src/store/api/team";
import ViewType from "@/src/components/common/ViewType";
import SearchInput from "@/src/components/common/SearchInput";
import LoadingEllipsis from "@/src/components/core/loaders/LoadingEllipsis";
import type { TData, TData2 } from "./types";
import type { TTeamMember } from "@/src/store/types/team";

const backgroundColors = ["#FF9797", "#E3B439", "#32BA50", "#97AEFF"];

export default function Team() {
  const [data, setData] = useQueryState<TData>(
    "data",
    parseAsJson<TData>().withDefault({
      view: "list",
      search: "",
    }),
  );

  const [data2, setData2] = useState<TData2>({
    openSheet: false,
    openMoreDropdown: false,
    rowSelection: {},
    sheetType: "add",
    member: {},
  });

  const { data: teamsData, isLoading } = useGetAllTeamMembersQuery({
    page: data.page,
    search: data.search,
  });

  const columns: ColumnDef<TTeamMember>[] = [
    {
      accessorKey: "name",
      header: () => <TableHead name="Name" />,
      cell: ({ row }) => {
        const { firstName } = row.original;

        return (
          <div className="flex items-center space-x-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F1F5F8] uppercase text-wheels-primary">
              {getIntials(firstName)}
            </div>
            <span className="text-sm font-medium capitalize text-wheels-primary">
              {firstName}
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
        const { createdAt } = row.original;

        return (
          <span className="text-sm text-wheels-primary">
            {format(createdAt, "MMM d, yyyy h:mma")}
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
    {
      accessorKey: "actions",
      header: () => <TableHead name="Actions" />,
      cell: ({ row }) => {
        const { id } = row.original;

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

  function handleExportMembers() {
    handleApiSuccessResponse({
      message: "Data exported successfully",
    });
  }

  function toggleSheet() {
    setData2({ ...data2, openSheet: !data2.openSheet });
  }

  function handleSheet(sheetType: TData2["sheetType"], id?: string) {
    let member = teamsData && teamsData.docs.find((member) => member.id === id);

    if (sheetType === "edit" && !member) {
      handleApiSuccessResponse({
        message: "Member not found",
      });

      return;
    }

    if ((sheetType === "edit" || sheetType === "view") && member) {
      setData2({ ...data2, member, openSheet: true, sheetType });
      return;
    }

    setData2({ ...data2, openSheet: true, sheetType });
  }

  return (
    <>
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
              <span>Team Members Count: {teamsData?.totalDocs}</span>
            </div>
          </div>

          <div className="hidden lg:flex lg:items-center">
            {teamsData &&
              teamsData.docs.slice(0, 4).map(({ fullName }, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: backgroundColors[index],
                    marginLeft: index === 0 ? "0" : "-10px",
                  }}
                  className="flex h-10 w-10 items-center justify-center rounded-full">
                  <span className="text-base font-semibold uppercase text-white">
                    {getIntials(fullName)}
                  </span>
                </div>
              ))}
          </div>
        </div>

        <div className="flex flex-col space-y-5 md:flex-row md:items-center md:justify-between md:space-x-3 md:space-y-0">
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
                <div role="button" className="cursor-pointer">
                  <span className="text-sm text-[rgba(85,112,126,1)]">
                    No Design Yet
                  </span>
                </div>
              </div>
            </DropdownMenu>

            <Button
              onClick={handleExportMembers}
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
            customText="Fetching Team Members"
            className="h-[50vh] lg:text-base"
          />
        ) : (
          <>
            {teamsData && teamsData.docs.length > 0 && (
              <>
                <div className="mt-10">
                  {data.view === "list" ? (
                    <DataTable
                      data={teamsData.docs}
                      columns={columns}
                      rowSelection={data2.rowSelection}
                      setRowSelection={(value: TTeamMember) =>
                        handleData2Change("rowSelection", value)
                      }
                    />
                  ) : (
                    <div className="grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                      {teamsData.docs.map((member, index) => (
                        <UserCard
                          dateCreated={member.createdAt}
                          name={member.fullName}
                          status={member.status}
                          id={member.id}
                          role={member.role}
                          key={index}
                        />
                      ))}
                    </div>
                  )}
                </div>

                <Pagination
                  initialPage={data.page ? data.page - 1 : 0}
                  pageCount={teamsData?.totalPages}
                  onPageChange={(page) => {
                    handleDataChange("page", page + 1);
                  }}
                />
              </>
            )}
          </>
        )}
      </section>

      <Sheet
        open={data2.openSheet}
        onOpenChange={() => handleData2Change("openSheet", !data2.openSheet)}
        className="w-full max-w-full px-0 pb-0 md:max-w-[520px]"
        showCloseButton>
        {(data2.sheetType === "add" || data2.sheetType === "edit") && (
          <TeamMemberForm
            close={toggleSheet}
            type={data2.sheetType}
            member={data2.member}
          />
        )}
        {data2.sheetType === "view" && (
          <TeamMemberProfile member={data2.member} />
        )}
      </Sheet>
    </>
  );
}
