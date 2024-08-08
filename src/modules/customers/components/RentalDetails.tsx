import ReceivedIcon from "@/src/components/icons/activities/ReceivedIcon";
import RentedOutIcon from "@/src/components/icons/activities/RentedOutIcon";
import RetrievedIcon from "@/src/components/icons/activities/RetrievedIcon";
import SentBackIcon from "@/src/components/icons/activities/SentBackIcon";
import { useGetRentalQuery } from "@/src/store/api/customer";

type TRentalProps = {
  id: string;
  asset?: string;
};
export default function RentalDetails({ id, asset }: TRentalProps) {
  const { data: rentalInfo, isLoading } = useGetRentalQuery(id);
  const assetInfo =
    rentalInfo && rentalInfo.assets.find((found) => found._id === asset);
  return (
    rentalInfo &&
    asset && (
      <div className=" flex w-full flex-col items-center space-y-2 bg-white p-2">
        {
          {
            rented: <RentedOutIcon />,
            retrieved: <RetrievedIcon />,
            rejected: <SentBackIcon />,
            received: <ReceivedIcon />,
          }["rented"]
        }
        <p className="pb-2 text-center font-bold">
          {rentalInfo?.isReturned ? "Capsule Returned" : "Capsule Rented"}
        </p>
        <p className="border-b pb-2">
          {"Capsule " +
            assetInfo?.serialNo +
            (rentalInfo?.isReturned ? " was returned to " : " was rented to ") +
            rentalInfo?.customerName}
        </p>
        <div className=" flex w-full flex-col items-start space-y-2 border-b pb-2">
          <span className="text-sm">Time of Rental</span>
          <p className="font-semibold">
            {rentalInfo?.rentalDate.split("T")[1] +
              " - " +
              rentalInfo?.rentalDate.split("T")[0]}
          </p>
        </div>
        {rentalInfo?.isReturned ? (
          <div className=" flex w-full flex-col items-start space-y-2 border-b pb-2">
            <span className="text-sm">Expected Time of Return</span>
            <p className="font-semibold">
              {rentalInfo?.expectedReturnDate.split("T")[1] +
                " - " +
                rentalInfo?.expectedReturnDate.split("T")[0]}
            </p>
          </div>
        ) : (
          <div className=" flex w-full flex-col items-start space-y-2 border-b pb-2">
            <span className="text-sm">Time of Return</span>
            <p className="font-semibold">
              {rentalInfo?.expectedReturnDate.split("T")[1] +
                " - " +
                rentalInfo?.expectedReturnDate.split("T")[0]}
            </p>
          </div>
        )}
        <div className=" flex w-full flex-col items-start space-y-2 border-b pb-2">
          <span className="text-sm">Customer's Name</span>
          <div className="flex items-center space-x-2">
            <p className="font-semibold capitalize">
              {rentalInfo?.customerName}
            </p>
          </div>
        </div>
        <div className=" flex w-full flex-col items-start space-y-2 border-b pb-2">
          <span className="text-sm">Ambassador's Name</span>
          <div className="flex items-center space-x-2">
            <p className="font-semibold capitalize">
              {rentalInfo?.ambassador.firstName +
                " " +
                rentalInfo?.ambassador.lastName}
            </p>
          </div>
        </div>
        <div className=" flex w-full flex-col items-start space-y-2 border-b pb-2">
          <span className="text-sm">Quantity of Capsules Rented</span>
          <p className="font-semibold">{rentalInfo?.assets.length}</p>
        </div>
        <div className=" flex w-full flex-col items-start space-y-2 border-b pb-2">
          <span className="text-sm">Serial Number of Capsules</span>

          <p className="font-semibold">{assetInfo?.serialNo}</p>
        </div>
        <div className=" flex w-full flex-col items-start space-y-2 border-b pb-2">
          <span className="text-sm">Ambassador Recieve</span>
          <p className="font-semibold">{`#${500 * rentalInfo?.assets.length}`}</p>
        </div>
        <div className=" flex w-full flex-col items-start space-y-2 border-b pb-2">
          <span className="text-sm">Holding Fee</span>
          <p className="font-semibold">#1000</p>
        </div>
      </div>
    )
  );
}
