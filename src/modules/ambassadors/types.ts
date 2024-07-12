import { TAmbassador } from "@/src/store/types/ambassadors";

export type TData = {
  view: "list" | "grid";
  page?: number;
};

export type TData2 = {
  openSheet: boolean;
  sheetType: "add" | "edit" | "view";
  rowSelection: TAmbassador;
  ambassador: TAmbassador;
};
