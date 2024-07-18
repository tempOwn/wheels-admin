import type { TViewType } from "@/src/components/common/ViewType";
import type { TAmbassador } from "@/src/store/types/ambassadors";

export type TData = {
  view: TViewType;
  page?: number;
  search?: string;
};

export type TData2 = {
  openSheet: boolean;
  sheetType: "add" | "edit" | "view";
  rowSelection: TAmbassador;
  ambassador: TAmbassador;
  searchValue: string;
};
