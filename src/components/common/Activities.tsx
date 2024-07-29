import { format } from "date-fns";
import ReceivedIcon from "@/src/components/icons/activities/ReceivedIcon";
import RetrievedIcon from "@/src/components/icons/activities/RetrievedIcon";
import SentBackIcon from "@/src/components/icons/activities/SentBackIcon";
import RentedOutIcon from "@/src/components/icons/activities/RentedOutIcon";
import { TCustomerActivities } from "@/src/store/types/customers";

export type TActivity = {
  type: "rented" | "retrieved" | "rejected" | "received";
  date: string;
  title: string;
};

type ActivitiesProps = {
  type: string;
  activities: TCustomerActivities[];
};

export default function Activities({ activities, type }: ActivitiesProps) {
  return (
    <div>
      <div className="mt-8">
        <p className="mb-4 text-sm font-medium text-black">
          {type}&apos;s Activities
        </p>

        <div className="space-y-4">
          {activities.map(({ action, rentalInfo, asset }, index) => {
            let title = rentalInfo.assets.find((prod) => prod._id === asset);
            return (
              <div
                key={index}
                className="flex items-center justify-between space-x-3 text-sm">
                <div className="flex items-center space-x-2">
                  {
                    {
                      rented: <RentedOutIcon />,
                      retrieved: <RetrievedIcon />,
                      rejected: <SentBackIcon />,
                      received: <ReceivedIcon />,
                    }[action]
                  }
                  {title && (
                    <p className="font-medium capitalize text-black">
                      {title.serialNo + " " + action}
                    </p>
                  )}
                </div>

                <span className="text-xs text-[#898A8D] lg:text-sm">
                  {format(new Date(rentalInfo.rentalDate), "do MMMM, yyyy")}
                </span>

                <span className="text-xs text-[#898A8D] lg:text-sm">
                  {format(new Date(rentalInfo.rentalDate), "hh:mm a")}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
