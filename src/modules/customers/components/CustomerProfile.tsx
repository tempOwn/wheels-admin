import Pagination from "@/src/components/common/Pagination";
import StatCard from "@/src/components/common/StatCard";
import StatusTag from "@/src/components/common/StatusTag";
import ScrollArea from "@/src/components/core/scroll-area";
import TextInput from "@/src/components/core/text-input";
import CapsulesIcon from "@/src/components/icons/CapsulesIcon";
import ClockIcon from "@/src/components/icons/ClockIcon";
import DeliveryVanIcon from "@/src/components/icons/DeliveryVanIcon";
import EmissionIcon from "@/src/components/icons/EmissionIcon";
import UserIcon from "@/src/components/icons/UserIcon";
import Activities, { TActivity } from "@/src/components/common/Activities";
import { TCustomer } from "@/src/store/types/customers";
import { useGetCustomerActivitiesQuery } from "@/src/store/api/customer";
import LoadingEllipsis from "@/src/components/loaders/LoadingEllipsis";
import { useState } from "react";

type CustomerProfileProps = {
  customer: TCustomer;
};

export default function CustomerProfile({
  customer: { _id, firstName, lastName, status, phoneNumber, email },
}: CustomerProfileProps) {
  const [paginationData, usePaginationData] = useState({ page: 0 });
  const { data: customerActivities, isLoading } = useGetCustomerActivitiesQuery(
    {
      id: _id,
      page: paginationData.page,
    },
  );
  console.log(customerActivities);
  return (
    <div>
      <div>
        <h2 className="border-b border-[rgba(207,207,207,1)] px-5 pb-2 text-lg font-medium text-wheels-primary lg:text-xl">
          Customer Profile
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
              <StatusTag status={status} />
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-2">
              <StatCard
                icon={<DeliveryVanIcon />}
                iconClass="bg-[#10B981]"
                value={24}
                description="Total Rentals"
              />

              <StatCard
                icon={<CapsulesIcon />}
                iconClass="bg-wheels-primary"
                value="EnergyBox"
                description="Top System Rented"
              />

              <StatCard
                icon={<EmissionIcon />}
                iconClass="bg-wheels-grey"
                value="120 KgCO2"
                description="Emission Saved"
              />

              <StatCard
                icon={<ClockIcon />}
                iconClass="bg-[#0070B2]"
                value="6"
                description="Late Returns"
              />

              <StatCard
                icon={<ClockIcon />}
                iconClass="bg-[#F59E0B]"
                value="39"
                description="Early Returns"
              />

              <StatCard
                icon={<ClockIcon />}
                iconClass="bg-wheels-grey"
                value="4"
                description="Incident Reported"
              />
            </div>
            <div className="space-y-3 rounded-sm p-2 shadow-card">
              <div className="flex items-center space-x-2">
                <div className="w-[40%]">
                  <TextInput defaultValue={phoneNumber} label="Phone Number" />
                </div>
                <div className="w-[60%]">
                  <TextInput defaultValue={email} label="Email Address" />
                </div>
              </div>
              <TextInput
                defaultValue="20 Rumuokoro Street, Rumuomasi, Ilupeju, Lagos"
                label="Home Address"
              />
            </div>
          </div>
          {isLoading ? (
            <>
              <LoadingEllipsis withText customText="Loading Activities" />
            </>
          ) : customerActivities?.docs ? (
            <Activities activities={customerActivities.docs} type="Customer" />
          ) : (
            <p>No activities</p>
          )}
          {customerActivities && (
            <Pagination
              initialPage={paginationData.page ? paginationData.page - 1 : 0}
              totalDataLength={customerActivities?.totalDocs}
              currentRange={{ start: 1, end: customerActivities?.totalPages }}
              pageCount={customerActivities?.totalPages}
              onPageChange={(page) =>
                usePaginationData({ page: paginationData.page + 1 })
              }
              className="flex-col space-x-0 space-y-2"
            />
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
