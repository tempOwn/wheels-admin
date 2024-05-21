export type TAssetStatus =
  | "active"
  | "inactive"
  | "rented-out"
  | "returned"
  | "available"
  | "faulty";

export type TAsset = {
  id: string;
  type: "capsule" | "energy-box" | "big-energy" | "bike" | "van";
  status: TAssetStatus;
  dateAdded: Date;
};

export type TData = {
  view: "list" | "grid";
  tab: TAsset["type"] | "all" | "others";
};

export type AssetCardProps = {
  id: string;
  type: TAsset["type"];
  status: TAssetStatus;
  dateAdded: Date;
};

export type StatusTagProps = {
  status: TAssetStatus;
  className?: string;
  onClick?: (status: TAssetStatus) => void;
};
