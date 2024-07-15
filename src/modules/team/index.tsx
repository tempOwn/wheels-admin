"use client";
import { useState, useEffect } from "react";
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
import {
  handleApiErrors,
  handleApiSuccessResponse,
} from "@/src/store/api/helper";
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
import type { TMember, TData, TData2 } from "./types";
import { useGetAllTeamMembersMutation } from "@/src/store/api/team";
import { useAppDispatch } from "@/src/store/hooks";
import { getAllTeamMembers } from "@/src/store/features/teamSlice";
import { TTeamMember, TTeamMembers } from "@/src/store/types/team";
import { selectTeamMembers } from "@/src/store/selectors";
import { useSelector } from "react-redux";

const backgroundColors = ["#FF9797", "#E3B439", "#32BA50", "#97AEFF"];
const members: TMember[] = [
  {
    name: "Daniel Oluwaseun",
    role: "Super Admin",
    id: "RFS-23409111",
    dateCreated: "2024-05-01T11:25:57.425Z",
    status: "active",
    phone: "09011223344",
    email: "danielolu@gmail.com",
    address: "20 Rumuokoro Street, Rumuomasi, Ilupeju, Lagos",
  },
  {
    name: "John Doe",
    role: "Admin",
    id: "RFS-23409112",
    dateCreated: "2024-05-01T11:25:57.425Z",
    status: "inactive",
    phone: "09011223344",
    email: "danielolu@gmail.com",
    address: "20 Rumuokoro Street, Rumuomasi, Ilupeju, Lagos",
  },
  {
    name: "Jane Matt",
    role: "Field Staff",
    id: "RFS-23409113",
    dateCreated: "2024-05-01T11:25:57.425Z",
    status: "active",
    phone: "09011223344",
    email: "danielolu@gmail.com",
    address: "20 Rumuokoro Street, Rumuomasi, Ilupeju, Lagos",
  },
  {
    name: "Doe John",
    role: "Gateman",
    id: "RFS-23409114",
    dateCreated: "2024-05-01T11:25:57.425Z",
    status: "inactive",
    phone: "09011223344",
    email: "danielolu@gmail.com",
    address: "20 Rumuokoro Street, Rumuomasi, Ilupeju, Lagos",
  },
  {
    name: "Babalola John",
    role: "Charge Agent",
    id: "RFS-23409115",
    dateCreated: "2024-05-01T11:25:57.425Z",
    status: "active",
    phone: "09011223344",
    email: "danielolu@gmail.com",
    address: "20 Rumuokoro Street, Rumuomasi, Ilupeju, Lagos",
  },
  {
    name: "Daniel Oluwaseun",
    role: "Super Admin",
    id: "RFS-23409116",
    dateCreated: "2024-05-01T11:25:57.425Z",
    status: "active",
    phone: "09011223344",
    email: "danielolu@gmail.com",
    address: "20 Rumuokoro Street, Rumuomasi, Ilupeju, Lagos",
  },
  {
    name: "John Doe",
    role: "Admin",
    id: "RFS-23409117",
    dateCreated: "2024-05-01T11:25:57.425Z",
    status: "inactive",
    phone: "09011223344",
    email: "danielolu@gmail.com",
    address: "20 Rumuokoro Street, Rumuomasi, Ilupeju, Lagos",
  },
  {
    name: "Jane Matt",
    role: "Field Staff",
    id: "RFS-23409118",
    dateCreated: "2024-05-01T11:25:57.425Z",
    status: "active",
    phone: "09011223344",
    email: "danielolu@gmail.com",
    address: "20 Rumuokoro Street, Rumuomasi, Ilupeju, Lagos",
  },
  {
    name: "Doe John",
    role: "Gateman",
    id: "RFS-23409119",
    dateCreated: "2024-05-01T11:25:57.425Z",
    status: "inactive",
    phone: "09011223344",
    email: "danielolu@gmail.com",
    address: "20 Rumuokoro Street, Rumuomasi, Ilupeju, Lagos",
  },
  {
    name: "Babalola John",
    role: "Charge Agent",
    id: "RFS-23409110",
    dateCreated: "2024-05-01T11:25:57.425Z",
    status: "active",
    phone: "09011223344",
    email: "danielolu@gmail.com",
    address: "20 Rumuokoro Street, Rumuomasi, Ilupeju, Lagos",
  },
  {
    name: "Daniel Oluwaseun",
    role: "Super Admin",
    id: "RFS-23409199",
    dateCreated: "2024-05-01T11:25:57.425Z",
    status: "active",
    phone: "09011223344",
    email: "danielolu@gmail.com",
    address: "20 Rumuokoro Street, Rumuomasi, Ilupeju, Lagos",
  },
  {
    name: "John Doe",
    role: "Admin",
    id: "RFS-23409188",
    dateCreated: "2024-05-01T11:25:57.425Z",
    status: "inactive",
    phone: "09011223344",
    email: "danielolu@gmail.com",
    address: "20 Rumuokoro Street, Rumuomasi, Ilupeju, Lagos",
  },
  {
    name: "Jane Matt",
    role: "Field Staff",
    id: "RFS-23409177",
    dateCreated: "2024-05-01T11:25:57.425Z",
    status: "active",
    phone: "09011223344",
    email: "danielolu@gmail.com",
    address: "20 Rumuokoro Street, Rumuomasi, Ilupeju, Lagos",
  },
  {
    name: "Doe John",
    role: "Gateman",
    id: "RFS-23409166",
    dateCreated: "2024-05-01T11:25:57.425Z",
    status: "inactive",
    phone: "09011223344",
    email: "danielolu@gmail.com",
    address: "20 Rumuokoro Street, Rumuomasi, Ilupeju, Lagos",
  },
  {
    name: "Babalola John",
    role: "Charge Agent",
    id: "RFS-23409155",
    dateCreated: "2024-05-01T11:25:57.425Z",
    status: "active",
    phone: "09011223344",
    email: "danielolu@gmail.com",
    address: "20 Rumuokoro Street, Rumuomasi, Ilupeju, Lagos",
  },
];

export default function Team() {
  const teamMembers = useSelector(selectTeamMembers);
  const members = teamMembers ? teamMembers.docs : [];
  console.log("team", members);

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
    sheetType: "add",
    member: {},
  });

  const columns: ColumnDef<TTeamMember>[] = [
    {
      accessorKey: "name",
      header: () => <TableHead name="Name" />,
      cell: ({ row }) => {
        const { firstName } = row.original;

        return (
          <div className="flex items-center space-x-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F1F5F8] text-wheels-primary">
              {getIntials(firstName)}
            </div>
            <span className="text-sm font-medium text-wheels-primary">
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
    let member = members.find((member) => member.id === id);

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

  const [getMembers, isLoading] = useGetAllTeamMembersMutation();
  const dispatch = useAppDispatch();
  type TPaginationData = {
    hasNextPage: boolean;
    hasPrevPage: boolean;
    limit: number;
    nextPage: number | null;
    offset: number;
    page: number;
    pagingCounter: number;
    prevPage: number | null;
    totalDocs: number;
    totalPages: number;
  };
  const [paginationData, setPaginationData] = useState<TPaginationData>({
    hasNextPage: false,
    hasPrevPage: false,
    limit: 10,
    nextPage: null,
    offset: 0,
    page: 1,
    pagingCounter: 1,
    prevPage: null,
    totalDocs: 16,
    totalPages: 1,
  });
  const handleSearch = (e: any) => {
    let search = e.target.value;
    searchTeamMembers(search);
  };
  async function searchTeamMembers(query: string) {
    const response = await getMembers(query).unwrap();
    if (response.data) {
      const { data, ...pagination } = response.data;
      setPaginationData(pagination);
      const searched: TTeamMembers = response.data;
      console.log("search", searched);
      dispatch(getAllTeamMembers({ teamMembers: searched }));
    } else {
      console.error("No data found");
    }
  }
  async function getAllMembers() {
    await getMembers("")
      .unwrap()
      .then((response) => {
        console.log(response);
        const { data, ...pagination } = response.data;
        setPaginationData(paginationData);
        console.log(paginationData);
        const teamData: TTeamMembers = response.data;

        dispatch(getAllTeamMembers({ teamMembers: teamData }));
      });
  }
  useEffect(() => {
    getAllMembers();
  }, []);

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
              <span>Team Members Count: 25</span>
            </div>
          </div>

          <div className="hidden lg:flex lg:items-center">
            {members.slice(0, 4).map(({ fullName }, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: backgroundColors[index],
                  marginLeft: index === 0 ? "0" : "-10px",
                }}
                className="flex h-10 w-10 items-center justify-center rounded-full">
                <span className="text-base font-semibold text-white">
                  {getIntials(fullName)}
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
                onChange={handleSearch}
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

        <div className="mt-10">
          {data.view === "list" ? (
            <DataTable
              data={members}
              columns={columns}
              rowSelection={data2.rowSelection}
              setRowSelection={(value: TTeamMember) =>
                handleData2Change("rowSelection", value)
              }
            />
          ) : (
            <div className="grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {members.map((member, index) => (
                <UserCard {...member} key={index} />
              ))}
            </div>
          )}
        </div>

        <Pagination
          initialPage={data.page ? data.page - 1 : 0}
          pageCount={paginationData.totalPages} // TODO - replace with actual data from api
          totalDataLength={paginationData.totalDocs} // TODO - replace with actual data from api
          currentRange={{ start: 1, end: paginationData.totalPages }} // TODO - replace with actual data from api
          onPageChange={(page) => {
            handleDataChange("page", page + 1);
          }}
        />
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
