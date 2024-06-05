"use client";
import { CopyIcon } from "@/src/components/icons/CopyIcon";
import CapsuleIcon from "@/src/components/icons/CapsuleIcon";
import WhatsappIcon from "@/src/components/icons/WhatsappIcon";
import { useEffect, useState } from "react";
import EmissionIcon from "@/src/components/icons/EmissionIcon";
import CircularCautionIcon from "@/src/components/icons/CircularCautionIcon";
import DeliveryIcon from "@/src/components/icons/DeliveryIcon";
import ClockIcon from "@/src/components/icons/ClockIcon";
import SlantArrowIcon from "@/src/components/icons/SlantArrowIcon";
import CustomerDp from "@/public/assets/images/customer-image.png";
import Image, { StaticImageData } from "next/image";

type TRentalDuration = {
  date: string;
  time: string;
};

type TActivity = {
  id: number;
  serialNumber: string;
  rentalDuration: TRentalDuration;
  returnDuration: TRentalDuration;
  status: string;
  ambassadorName: string;
  quantity: number;
};

type TCustomer = {
  name: string;
  image: StaticImageData;
  phoneNumber: string;
  emailAddress: string;
  homeAddress: string;
  status: string;
  totalRentals: number;
  topSystemRented: string;
  emissionSaved: string;
  lateReturns: number;
  earlyReturns: number;
  incidentReported: number;
  activities: TActivity[];
};

const customers: TCustomer[] = [
  {
    name: "Bosun Jr Gbadegbo",
    image: CustomerDp,
    phoneNumber: "+2348105628191",
    emailAddress: "gbadebobosun@gmail.com",
    homeAddress: "20 Rumuokoro Sreet, Rumuomasi, Ilupeju, Lagos",
    status: "Inactive",
    totalRentals: 45,
    topSystemRented: "EnergyBox",
    emissionSaved: "120 KgCo",
    lateReturns: 6,
    earlyReturns: 39,
    incidentReported: 4,
    activities: [
      {
        id: 0,
        serialNumber: "RC-81240932",
        rentalDuration: {
          date: "Friday, 25 Aug 2023",
          time: "11:03am",
        },
        returnDuration: {
          date: "Saturday, 26 Aug 2023",
          time: "08:24am",
        },
        status: "returned",
        ambassadorName: "Daniel Benson",
        quantity: 1,
      },
      {
        id: 1,
        serialNumber: "RC-81240932",
        rentalDuration: {
          date: "Monday, 21 Aug 2023",
          time: "11:03am",
        },
        returnDuration: {
          date: "Tuesday, 22 Aug 2023",
          time: "08:24am",
        },
        status: "rented",
        ambassadorName: "Moses Abayomi",
        quantity: 1,
      },
      {
        id: 2,
        serialNumber: "RC-81240932",
        rentalDuration: {
          date: "Friday, 25 Aug 2023",
          time: "7:05am",
        },
        returnDuration: {
          date: "Saturday, 26 Aug 2023",
          time: "08:24am",
        },
        status: "returned",
        ambassadorName: "Daniel Benson",
        quantity: 1,
      },
      {
        id: 3,
        serialNumber: "RC-81240932",
        rentalDuration: {
          date: "Tuesday, 29 Nov 2023",
          time: "10:00am",
        },
        returnDuration: {
          date: "Wednesday, 30 Nov 2023",
          time: "08:40am",
        },
        status: "rented",
        ambassadorName: "Daniel Benson",
        quantity: 1,
      },
    ],
  },
];
export default function CustomerProfile({ id = 0 }: { id?: number }) {
  const [customer, setCustomer] = useState<null | TCustomer>(null);
  const [activity, setActivity] = useState<null | TActivity>(null);

  const getCustomerInfo = () => {
    setCustomer(customers[id]);
  };

  useEffect(() => {
    getCustomerInfo();
  }, []);

  const getActivity = (id: number) => {
    if (customer !== null) {
      setActivity(customer.activities[id]);
    }
  };
  const copyValue = async (text: string) => {
    navigator.clipboard.writeText(text);
  };
  return (
    customer && (
      <div className="flex items-start space-x-5 px-8">
        <div className="flex w-1/2 flex-col space-y-2 bg-white px-8 py-7">
          <h1 className="border-b py-2 text-xl font-semibold shadow-sm">
            Customer&apos;s Profile
          </h1>
          <div className="flex items-center space-x-2 ">
            <Image src={CustomerDp} alt="Customer Image" />
            <div className="flex w-1/3 flex-col items-start space-y-1">
              <p className="font-bold">{customer.name}</p>
              <span className="rounded-lg bg-[#E8E3DD] px-2 py-1 text-xs text-[#8B7357]">
                <li>Customer</li>
              </span>
            </div>
            <div className="space-x-1 rounded-lg bg-[#FEEDED] px-2 py-1 text-xs text-wheels-error">
              <li>{customer.status}</li>
            </div>
          </div>

          <div className="flex flex-wrap items-center">
            <div className="flex w-[30%] flex-col items-start rounded-sm p-2 shadow-md">
              <span className="mb-6 rounded-full bg-[#10B981] p-1.5">
                <DeliveryIcon />
              </span>
              <p className="mb-2 text-2xl font-bold text-wheels-primary">
                {customer.totalRentals}
              </p>
              <p className="text-sm">Total Rentals</p>
            </div>

            <div className="ml-4 flex w-[30%] flex-col items-start rounded-sm p-2 shadow-md">
              <span className="mb-6 rounded-full bg-wheels-primary p-1.5">
                <CapsuleIcon />
              </span>
              <p className="mb-2 text-2xl font-bold text-wheels-primary">
                {customer.topSystemRented}
              </p>
              <p className="text-sm">Top System Rented</p>
            </div>

            <div className="ml-4 flex w-[30%] flex-col items-start rounded-sm p-2 shadow-md">
              <span className="mb-6 rounded-full bg-[#55707E] p-1.5">
                <EmissionIcon />
              </span>
              <p className="mb-2 text-2xl font-bold text-wheels-primary">
                {customer.emissionSaved}
              </p>
              <p className="text-sm">Emission Saved</p>
            </div>

            <div className="mt-4 flex w-[30%] flex-col items-start rounded-sm p-2 shadow-md">
              <span className="mb-6 rounded-full bg-[#0070B2] p-1.5">
                <ClockIcon />
              </span>
              <p className="mb-2 text-2xl font-bold text-wheels-primary">
                {customer.lateReturns}
              </p>
              <p className="text-sm">Late Returns</p>
            </div>

            <div className="ml-4 mt-4 flex w-[30%] flex-col items-start rounded-sm p-2 shadow-md">
              <span className="mb-6 rounded-full bg-[#F6AA29] p-1.5">
                <ClockIcon />
              </span>
              <p className="mb-2 text-2xl font-bold text-wheels-primary">
                {customer.earlyReturns}
              </p>
              <p className="text-sm">Early Returns</p>
            </div>

            <div className="ml-4 mt-4 flex w-[30%] flex-col items-start rounded-sm p-2 shadow-md">
              <span className="mb-6 rounded-full bg-[#55707E] p-1.5">
                <CircularCautionIcon />
              </span>
              <p className="mb-2 text-2xl font-bold text-wheels-primary">
                {customer.incidentReported}
              </p>
              <p className="text-sm">Incident Reported</p>
            </div>
          </div>

          <div className="flex flex-col space-y-2 px-2 py-6 shadow-md">
            <div className="flex items-center space-x-2">
              <label className="w-1/2">
                <span className="text-[#55707E]">Phone Number</span>
                <div className="flex items-center space-x-2 rounded-lg border pr-2">
                  <input
                    className=" w-full rounded-lg p-2"
                    type="tel"
                    value={customer.phoneNumber}
                  />
                  <button>
                    <WhatsappIcon />
                  </button>
                </div>
              </label>

              <label className="w-1/2">
                <span className="text-[#55707E]">Email Address</span>
                <div className="flex items-center space-x-2 rounded-lg border pr-2">
                  <input
                    className="w-full rounded-lg p-2"
                    type="email"
                    value={customer.emailAddress}
                  />
                  <button onClick={() => copyValue(customer.emailAddress)}>
                    <CopyIcon />
                  </button>
                </div>
              </label>
            </div>

            <label>
              <span className="text-[#55707E]">Home Address</span>
              <div className="rounded-lg border">
                <input
                  className=" w-full rounded-lg p-2"
                  type="text"
                  value={customer.homeAddress}
                />
              </div>
            </label>
          </div>

          <div>
            <div className="flex items-center justify-between py-5">
              <p className="font-semibold">Customer Activities</p>
              <button className="text-xs">View all</button>
            </div>
            <div className="flex w-full flex-col items-start">
              {customer.activities.map(
                ({ serialNumber, status, id, rentalDuration }) => (
                  <button
                    key={id}
                    onClick={() => getActivity(id)}
                    className="flex w-full items-center justify-between border-b py-2"
                  >
                    <div className="flex items-center space-x-2">
                      <span
                        className={` rounded-full p-2 ${status === "returned" ? "bg-[#CCECFF] text-[#0070B2]" : "rotate-180 bg-[#E8E3DD] text-[#8B7357]"}`}
                      >
                        <SlantArrowIcon />
                      </span>
                      <p className="font-bold">
                        {serialNumber +
                          (status === "returned" ? " Returned" : " Rented out")}
                      </p>
                    </div>
                    <span className="text-sm text-[#B5B5B8]">
                      {rentalDuration.date}
                    </span>
                    <span className="text-sm text-[#B5B5B8]">
                      {rentalDuration.time}
                    </span>
                  </button>
                ),
              )}
            </div>
          </div>
        </div>
        {activity && (
          <div className=" flex w-1/3 flex-col items-start space-y-2 bg-white px-3 py-5">
            <span
              className={`m-[auto] rounded-full p-5 ${activity.status === "returned" ? "bg-[#CCECFF] text-[#0070B2]" : "rotate-180 bg-[#E8E3DD] text-[#8B7357]"}`}
            >
              <SlantArrowIcon />
            </span>
            <p className="m-[auto] pb-6 text-lg font-bold">
              {activity.status === "returned"
                ? "Capsule Returned"
                : "Capsule Rented"}
            </p>
            <p className="border-b pb-2">
              {"Capsule " +
                activity.serialNumber +
                (activity.status == "returned"
                  ? " was returned to "
                  : " was rented to ") +
                customer.name}
            </p>
            <div className=" flex w-full flex-col items-start space-y-2 border-b pb-2">
              <span className="text-sm">Time of Rental</span>
              <p className="font-semibold">
                {activity.rentalDuration.time +
                  " - " +
                  activity.rentalDuration.date}
              </p>
            </div>
            {activity.status === "returned" ? (
              <div className=" flex w-full flex-col items-start space-y-2 border-b pb-2">
                <span className="text-sm">Time of Return</span>
                <p className="font-semibold">
                  {activity.returnDuration.time +
                    " - " +
                    activity.returnDuration.date}
                </p>
              </div>
            ) : (
              <div></div>
            )}

            <div className=" flex w-full flex-col items-start space-y-2 border-b pb-2">
              <span className="text-sm">Expected Time of Return</span>
              <p className="font-semibold">
                {activity.returnDuration.time +
                  " - " +
                  activity.returnDuration.date}
              </p>
            </div>
            <div className=" flex w-full flex-col items-start space-y-2 border-b pb-2">
              <span className="text-sm">Customer&apos;s Name</span>
              <div className="flex items-center space-x-2">
                <p className="font-semibold">{customer.name}</p>
              </div>
            </div>
            <div className=" flex w-full flex-col items-start space-y-2 border-b pb-2">
              <span className="text-sm">Ambassador&apos;s Name</span>
              <div className="flex items-center space-x-2">
                <p className="font-semibold">{activity.ambassadorName}</p>
              </div>
            </div>
            <div className=" flex w-full flex-col items-start space-y-2 border-b pb-2">
              <span className="text-sm">Quantity of Capsules Returned</span>
              <p className="font-semibold">{activity.quantity}</p>
            </div>
            <div className=" flex w-full flex-col items-start space-y-2 border-b pb-2">
              <span className="text-sm">Serial Number of Capsules</span>
              <div className="flex  w-full items-center justify-between">
                <p className="font-semibold">{activity.serialNumber}</p>
                <button onClick={() => copyValue(activity.serialNumber)}>
                  <CopyIcon />
                </button>
              </div>
            </div>
            <div className=" flex w-full flex-col items-start space-y-2 border-b pb-2">
              <span className="text-sm">Ambassador Recieve</span>
              <p className="font-semibold">{`#${500 * activity.quantity}`}</p>
            </div>
            <div className=" flex w-full flex-col items-start space-y-2 border-b pb-2">
              <span className="text-sm">Holding Fee</span>
              <p className="font-semibold">#1000</p>
            </div>
          </div>
        )}
      </div>
    )
  );
}
