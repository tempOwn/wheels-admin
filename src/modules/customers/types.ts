import type { TCustomer } from "@/src/store/types/customers";

export type TData = {
  view: "list" | "grid";
  page?: number;
  search?: string;
};

export type TData2 = {
  openSheet: boolean;
  sheetType: "add" | "edit" | "view";
  rowSelection: TCustomer;
  customer: TCustomer;
};
