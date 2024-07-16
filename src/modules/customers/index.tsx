"use client";
import { useEffect, useState } from "react";
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
import {
  handleApiErrors,
  handleApiSuccessResponse,
} from "@/src/store/api/helper";
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
import { useGetAllCustomersMutation } from "@/src/store/api/customer";
import { useAppDispatch } from "@/src/store/hooks";
import { TCustomer } from "@/src/store/types/customers";
import { getAllCustomers } from "@/src/store/features/customerSlice";
import { useSelector } from "react-redux";
import { selectCustomers } from "@/src/store/selectors";

export default function Customers() {
  const customersList = useSelector(selectCustomers);
  const customers = customersList ? customersList : [];

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
        // let total = 0
        // for (let i = 0; i < customers.length; i++) {
        //   total += customers[i].
        // }
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

  const [getCustomers, isLoading] = useGetAllCustomersMutation();
  const dispatch = useAppDispatch();
  const [paginationData, setPaginationData] = useState({
    totalDocs: 200,
    totalPages: 10,
    page: 1,
  });

  const handleSearch = (e: any) => {
    let query = e.target.value;
    searchCustomers(query, paginationData.page);
  };
  async function searchCustomers(search: string, page: number) {
    await getCustomers({ search, page })
      .unwrap()
      .then((response) => {
        const searchResult = response.data.docs;
        const { docs, ...pagination } = response.data;
        setPaginationData(pagination);
        console.log(pagination);
        dispatch(getAllCustomers({ customers: searchResult }));
      })
      .catch((error) => {
        handleApiErrors(error);
      });
  }

  async function fetchAllCustomers(search: string, page: number) {
    await getCustomers({ search, page })
      .unwrap()
      .then((response) => {
        const customers = response.data.docs;
        const { docs, ...pagination } = response.data;
        setPaginationData(pagination);
        console.log(pagination);
        console.log(response.data);
        dispatch(getAllCustomers({ customers }));
      })
      .catch((error) => {
        handleApiErrors(error);
      });
  }
  useEffect(() => {
    fetchAllCustomers("", paginationData.page);
  }, []);

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
                  onChange={handleSearch}
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
            initialPage={paginationData.page ? paginationData.page - 1 : 0}
            pageCount={paginationData.totalPages} // TODO - replace with actual data from api
            totalDataLength={paginationData.totalDocs} // TODO - replace with actual data from api
            currentRange={{
              start: paginationData.page,
              end: paginationData.totalPages,
            }} // TODO - replace with actual data from api
            onPageChange={(page) => {
              setPaginationData((prev) => ({ ...prev, page }));
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
