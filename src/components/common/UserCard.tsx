import { format } from "date-fns";
import { getIntials } from "@/src/lib/utils";
import StatusTag from "@/src/components/common/StatusTag";
import CalendarIcon from "@/src/components/icons/CalendarIcon";

type UserCardProps = {
  id?: string;
  status: "active" | "inactive";
  name: string;
  role?: string;
  address?: string;
  phoneNumber?: string;
  dateCreated: string;
};

export default function UserCard({
  id,
  status,
  name,
  role,
  address,
  phoneNumber,
  dateCreated,
}: UserCardProps) {
  return (
    <div className="rounded-lg border border-[rgba(204,212,216,1)] p-2 px-3">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#F1F5F8] text-base font-medium uppercase text-wheels-primary lg:h-12 lg:w-12 lg:text-lg">
        {getIntials(name)}
      </div>

      <div>
        <p className="mb-1 text-sm font-bold capitalize lg:text-base">{name}</p>
        {role && (
          <p className="text-13 font-medium text-[rgba(39,39,39,0.5)]">
            {role}
          </p>
        )}

        {id && (
          <p className="mb-4 mt-1.5 text-13 text-[rgba(72,72,72,1)]">{id}</p>
        )}

        {phoneNumber && (
          <p className="mb-4 mt-1.5 text-13 text-[rgba(72,72,72,1)]">
            {phoneNumber}
          </p>
        )}

        {address && (
          <p className="mb-4 mt-1.5 text-13 text-[rgba(72,72,72,1)]">
            {address}
          </p>
        )}

        <div className="flex items-center justify-between space-x-1.5 border-t-[0.5px] border-t-black/20 pt-2">
          <div className="flex items-center space-x-1">
            <CalendarIcon className="h-3 w-3" />
            <span className="text-xs">
              {format(dateCreated, "dd MMM, yyyy")}
            </span>
          </div>

          <StatusTag status={status} />
        </div>
      </div>
    </div>
  );
}
