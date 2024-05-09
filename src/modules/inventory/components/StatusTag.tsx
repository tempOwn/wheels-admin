import type { TInventory, StatusTagProps } from "../types";

function getStatusClasses(status: TInventory["status"]) {
  switch (status) {
    case "active":
      return "bg-[rgba(16,185,129,0.1)] text-[#10B981]";
    case "inactive":
      return "bg-[rgba(239,68,68,0.1)] text-wheels-error";
    case "rented-out":
      return "bg-[rgba(139,115,87,0.1)] text-[rgba(139,115,87,1)]";
    case "returned":
      return "bg-[rgba(0,112,178,0.1)] text-[rgba(0,112,178,1)]";
    default:
      return "";
  }
}

export default function StatusTag({ status }: StatusTagProps) {
  return (
    <div
      className={`inline-flex items-center space-x-2 rounded-lg px-2.5 py-1 ${getStatusClasses(status)}`}
    >
      <div className="h-2 w-2 rounded-full bg-current"></div>
      <span className="text-xs capitalize">{status}</span>
    </div>
  );
}
