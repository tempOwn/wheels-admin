export type TData = {
  view: "list" | "grid";
  page?: number;
  search?: string;
};

export type TData2 = {
  openSheet: boolean;
  sheetType: "add" | "edit" | "view";
  openMoreDropdown: boolean;
  rowSelection: Record<string, any>; // TODO: replace with what actual data from api
  member: Record<string, any>; // TODO: replace with what actual data from api
};

export type TMember = {
  name: string;
  role: string;
  id: string;
  dateCreated: string;
  status: "active" | "inactive";
  phone: string;
  email: string;
  address: string;
};
