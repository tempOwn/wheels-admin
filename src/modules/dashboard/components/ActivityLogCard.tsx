import Image from "next/image";
import Avatar from "@/public/assets/images/avatar.png";

type TActivityLog = {
  type: "asset" | "user";
  title: string;
  time: string;
  description: string;
  read: boolean;
};

const activityLogs: TActivityLog[] = [
  {
    type: "user",
    title: "Customer Registration",
    time: "58 minutes ago",
    description:
      "Amb. Edmund Doyle added a new customer, Your approval is needed.",
    read: false,
  },
  {
    type: "user",
    title: "Ambassador Registration",
    time: "23 minutes ago",
    description:
      "You just registered a new ambassador to the team. AMB-MOW2345",
    read: true,
  },
  {
    type: "asset",
    title: "Ambassador Registration",
    time: "44 minutes ago",
    description: "Big Energy has been added to the inventory dkdk kekee",
    read: false,
  },
  {
    type: "user",
    title: "Team Member",
    time: "44 minutes ago",
    description:
      "You just registered a new ambassador to the team. AMB-MOW2345",
    read: false,
  },
  {
    type: "user",
    title: "Ambassador",
    time: "44 minutes ago",
    description:
      "I'm Will like to change my address on my profile to 34, Funsho Williams Ave, Ikeja, Lagos",
    read: true,
  },
];

export default function ActivityLogCard() {
  return (
    <div className="rounded-md border border-wheels-border-2 bg-white p-5">
      <div className="mb-3 flex items-center justify-between">
        <p className="ttext-wheels-primary font-semibold lg:text-lg">
          Activity Log
        </p>
        <button className="text-sm">View all</button>
      </div>

      <div>
        {activityLogs.map(({ type, title, time, description, read }, index) => (
          <div
            key={index}
            className={`${index !== activityLogs.length - 1 ? "border-b border-black/20 py-4" : "pb-1 pt-4"} flex items-center space-x-2`}>
            <div className="">
              <Image src={Avatar} width={56} height={56} alt="avatar" />
            </div>

            <div className="w-full space-y-1">
              <p className="flex items-center space-x-4 text-sm text-[#1A1A1A80] lg:text-xs 2xl:text-sm">
                <span className="font-bold">{title}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-[#1A1A1A80]"></span>
                <span>{time}</span>
              </p>

              <p
                className={`max-w-[95%] text-sm text-wheels-primary ${read ? "font-medium" : ""}`}>
                {description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
