export type TInventoryStatus =
  | "active"
  | "inactive"
  | "rented-out"
  | "returned"
  | "available"
  | "faulty";

export type TInventory = {
  id: string;
  type: "capsule" | "energy-box" | "big-energy" | "bike" | "van";
  status: TInventoryStatus;
  dateAdded: Date;
};

export type TData = {
  view: "list" | "grid";
  tab: TInventory["type"] | "all" | "others";
};

export type AssetCardProps = {
  id: string;
  type: TInventory["type"];
  status: TInventory["status"];
  dateAdded: Date;
};

export type StatusTagProps = {
  status: TInventory["status"];
  className?: string;
  onClick?: (status: TInventoryStatus) => void;
};
