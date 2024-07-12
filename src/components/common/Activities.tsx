import { format } from "date-fns";
import ReceivedIcon from "@/src/components/icons/activities/ReceivedIcon";
import RetrievedIcon from "@/src/components/icons/activities/RetrievedIcon";
import SentBackIcon from "@/src/components/icons/activities/SentBackIcon";
import RentedOutIcon from "@/src/components/icons/activities/RentedOutIcon";

export type TActivity = {
  type: "rented-out" | "retrieved" | "sent-back" | "received";
  date: string;
  title: string;
};

type ActivitiesProps = {
  type: string;
  activities: TActivity[];
};

export default function Activities({ activities, type }: ActivitiesProps) {
  return (
    <div>
      <div className="mt-8">
        <p className="mb-4 text-sm font-medium text-black">
          {type}&apos;s Activities
        </p>

        <div className="space-y-4">
          {activities.map(({ type, date, title }, index) => (
            <div
              key={index}
              className="flex items-center justify-between space-x-3 text-sm">
              <div className="flex items-center space-x-2">
                {
                  {
                    "rented-out": <RentedOutIcon />,
                    retrieved: <RetrievedIcon />,
                    "sent-back": <SentBackIcon />,
                    received: <ReceivedIcon />,
                  }[type]
                }
                <p className="font-medium text-black">{title}</p>
              </div>

              <span className="text-xs text-[#898A8D] lg:text-sm">
                {format(new Date(date), "do MMMM, yyyy")}
              </span>

              <span className="text-xs text-[#898A8D] lg:text-sm">
                {format(new Date(date), "hh:mm a")}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
