export type TData = {
  view: "list" | "grid";
};

export type TData2 = {
  openSheet: boolean;
  openMoreDropdown: boolean;
  rowSelection: Record<string, any>;
};

export type TMember = {
  name: string;
  role: string;
  id: string;
  dateCreated: Date;
  status: "active" | "inactive";
};
