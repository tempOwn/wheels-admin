import { format } from "date-fns";
import { getIntials } from "@/src/lib/utils";
import StatusTag from "@/src/components/common/StatusTag";
import CalendarIcon from "@/src/components/icons/CalendarIcon";
import type { TMember } from "../types";

export default function MemberCard({
  id,
  status,
  name,
  role,
  dateCreated,
}: TMember) {
  return (
    <div className="rounded-lg border border-[rgba(204,212,216,1)] p-2 px-3">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#F1F5F8] text-base font-medium text-wheels-primary lg:h-12 lg:w-12 lg:text-lg">
        {getIntials(name)}
      </div>

      <div>
        <p className="mb-1 text-sm font-bold lg:text-base">{name}</p>
        <p className="text-13 font-medium text-[rgba(39,39,39,0.5)]">{role}</p>
        <p className="mb-4 mt-1.5 text-13 text-[rgba(72,72,72,1)]">{id}</p>

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
