import { format } from "date-fns/format";
import StatCard from "@/src/components/common/StatCard";
import StatusTag from "@/src/components/common/StatusTag";
import ScrollArea from "@/src/components/core/scroll-area";
import TextInput from "@/src/components/core/text-input";
import UserIcon from "@/src/components/icons/UserIcon";
import Pagination from "@/src/components/common/Pagination";
import CapsulesIcon from "@/src/components/icons/CapsulesIcon";
import ClockIcon from "@/src/components/icons/ClockIcon";
import ArrowRightSkewedIcon from "@/src/components/icons/ArrowRightSkewedIcon";
import Activities, { TActivity } from "@/src/components/common/Activities";
import type { TAmbassador } from "@/src/store/types/ambassadors";

type TeamMemberDetailsProps = {
  ambassador: TAmbassador;
};

const activities: TActivity[] = [
  {
    type: "rented-out",
    date: "2024-05-01T11:25:57.425Z",
    title: "RC-81240932 Rented out",
  },
  {
    type: "retrieved",
    title: "RC-81240932 retrieved",
    date: "2024-05-01T11:25:57.425Z",
  },
  {
    type: "sent-back",
    title: "34 systems sent back to ...",
    date: "2024-05-01T11:25:57.425Z",
  },
  {
    type: "received",
    title: "19 systems received from...",
    date: "2024-05-01T11:25:57.425Z",
  },
  {
    type: "retrieved",
    title: "RC-81240932 retrieved",
    date: "2024-05-01T11:25:57.425Z",
  },
  {
    type: "rented-out",
    date: "2024-05-01T11:25:57.425Z",
    title: "RC-81240932 Rented out",
  },
];

export default function AmbassadorProfile({
  ambassador: { phoneNumber, email, firstName, lastName },
}: TeamMemberDetailsProps) {
  return (
    <div>
      <div>
        <h2 className="border-b border-[rgba(207,207,207,1)] px-5 pb-2 text-lg font-medium text-wheels-primary lg:text-xl">
          Ambassador Profile
        </h2>
      </div>

      <ScrollArea className="h-[calc(100vh-50px)] w-full pb-10 pt-8">
        <div className="px-5">
          <div className="space-y-8">
            <div className="flex items-start justify-between space-x-3">
              <div className="flex items-center space-x-3 lg:space-x-5">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F1F5F8]">
                  <UserIcon className="h-8 w-8" />
                </div>
                <div className="space-y-2">
                  <p className="text-base font-medium capitalize text-wheels-primary lg:text-lg">
                    {firstName + " " + lastName}
                  </p>
                  <div className="inline-flex items-center space-x-2 rounded-2xl bg-wheels-grey px-2 py-1 text-white">
                    <div className="h-2 w-2 rounded-full bg-white" />
                    <span className="text-xs">Ambassador</span>
                  </div>
                </div>
              </div>
              <StatusTag status="active" />
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-2">
              <StatCard
                icon={<ArrowRightSkewedIcon className="text-white" />}
                iconClass="bg-[#10B981]"
                value={24}
                description="Total Rentals"
              />

              <StatCard
                icon={<CapsulesIcon />}
                iconClass="bg-wheels-primary"
                value="Capsule"
                description="Top System Rented"
              />

              <StatCard
                icon={<ClockIcon />}
                iconClass="bg-wheels-grey"
                value="24 min"
                description="Avg. Rental Time"
              />
            </div>
            <div className="space-y-3 rounded-sm p-2 shadow-card">
              <div className="flex items-center space-x-2">
                <TextInput defaultValue={phoneNumber} label="Phone Number" />
                <TextInput defaultValue={email} label="Email Address" />
              </div>
              <TextInput
                defaultValue="20 Rumuokoro Street, Rumuomasi, Ilupeju, Lagos"
                label="Residential Address"
              />
              <TextInput
                defaultValue="20 Rumuokoro Street, Rumuomasi, Ilupeju, Lagos"
                label="Store Address"
              />
            </div>
          </div>

          <Activities activities={activities} type="Ambassador" />

          <Pagination
            initialPage={1}
            pageCount={10}
            onPageChange={(page) => console.log(page)}
            className="flex-col space-x-0 space-y-2"
          />
        </div>
      </ScrollArea>
    </div>
  );
}
