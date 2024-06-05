import { useMemo, useState } from "react";
import Image, { StaticImageData } from "next/image";
import Avatar from "@/public/assets/images/avatar.png";
import ChevronLeftIcon from "@/src/components/icons/ChevronLeftIcon";
import ChevronRightIcon from "@/src/components/icons/ChevronRightIcon";

type TUserData = {
  id: number;
  image: StaticImageData;
  location: string;
  name: string;
  rentals: number;
};

const ambassadorsData: TUserData[] = [
  {
    id: 1,
    image: Avatar,
    location: "Mushin",
    name: "Qudus Iyanda",
    rentals: 89,
  },
  {
    id: 2,
    image: Avatar,
    location: "Mowe",
    name: "Gbenga Daniels",
    rentals: 77,
  },
  {
    id: 3,
    image: Avatar,
    location: "Mushin",
    name: "Kolawole Ajaka",
    rentals: 77,
  },
  {
    id: 4,
    image: Avatar,
    location: "Epe",
    name: "Cletus Mba",
    rentals: 21,
  },
  {
    id: 5,
    image: Avatar,
    location: "Mowe",
    name: "John Doe",
    rentals: 30,
  },
];

const customersData: TUserData[] = [
  {
    id: 1,
    image: Avatar,
    location: "Mowe",
    name: "Korede Daniels",
    rentals: 345,
  },
  {
    id: 2,
    image: Avatar,
    location: "Mowe",
    name: "Gbenga Daniels",
    rentals: 128,
  },
  {
    id: 3,
    image: Avatar,
    location: "Mowe",
    name: "Gbenga Daniels",
    rentals: 98,
  },

  {
    id: 4,
    image: Avatar,
    location: "Mowe",
    name: "Gbenga Daniels",
    rentals: 48,
  },
];

const totalSystemsRented = customersData.reduce(
  (sum, customerData) => sum + customerData.rentals,
  0,
);

function refineData(dataType: "customers" | "ambassadors") {
  if (dataType === "ambassadors") {
    const topPerformingAmb = ambassadorsData.reduce((prev, current) =>
      prev.rentals > current.rentals ? prev : current,
    );

    const otherAmbassadors = ambassadorsData.filter(
      (amb) => amb.id !== topPerformingAmb.id,
    );

    console.log(topPerformingAmb);

    return {
      topPerformingAmb,
      otherAmbassadors,
    };
  }
}

function UserCard({ id, name, location, rentals }: TUserData) {
  return (
    <div key={id} className="space-y-2">
      <div className="flex items-center space-x-2">
        <p className="text-xs font-semibold text-wheels-grey">{name}</p>
        <div className="flex items-center space-x-1 rounded-lg bg-[#5654D133] px-2">
          <div className="h-[5px] w-[5px] rounded-full bg-[#5654D1]" />
          <span className="text-[10px] font-medium text-[#5654D1]">
            {location}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between space-x-3">
        <div className="h-2 w-full overflow-hidden rounded-[30px] bg-[#ECF5FA]">
          <div
            style={{
              width: `${(rentals / 100) * 100}%`,
            }}
            className="h-full bg-wheels-primary"
          />
        </div>
        <span className="text-xs font-semibold text-wheels-secondary">
          {rentals}
        </span>
      </div>
    </div>
  );
}

export default function TopPerformers() {
  const [activeSlide, setActiveSlide] = useState(1);

  const ambassadors = useMemo(() => refineData("ambassadors"), []);

  const handleSlide = (direction: "prev" | "next") => {
    if (direction === "next") {
      setActiveSlide((prev) => (prev === 2 ? 1 : prev + 1));
    } else {
      setActiveSlide((prev) => (prev === 1 ? 2 : prev - 1));
    }
  };

  return (
    <div className="border-wheels-border-2 w-full rounded-lg border bg-white p-3 lg:w-1/3">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="font-semibold">Top Performers</h2>
        <div className="flex items-center space-x-3">
          <button onClick={() => handleSlide("prev")}>
            <ChevronLeftIcon className="text-current" />
          </button>
          <button onClick={() => handleSlide("next")}>
            <ChevronRightIcon className="text-current" />
          </button>
        </div>
      </div>

      <p className="text-wheels-tertiary mb-4 text-xs font-bold uppercase">
        {
          {
            1: "Ambassadors",
            2: "Customers",
          }[activeSlide]
        }
      </p>

      <div>
        {
          {
            1: (
              <>
                <div className="mb-4 flex w-full items-center space-x-2 rounded-sm border px-2 py-2">
                  {ambassadors?.topPerformingAmb.image && (
                    <Image
                      src={ambassadors?.topPerformingAmb.image}
                      alt="avatar"
                      width={54}
                      height={54}
                    />
                  )}
                  <div className="space-y-1">
                    <p className="font-semibold text-wheels-primary">
                      {ambassadors?.topPerformingAmb.name}
                    </p>
                    <p className="text-wheels-tertiary text-xs font-medium uppercase">
                      Rental Made
                    </p>
                    <p className="text-xs font-semibold uppercase text-wheels-primary">
                      {ambassadors?.topPerformingAmb.rentals} Systems
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {ambassadors?.otherAmbassadors.map((item) => (
                    <UserCard key={item.id} {...item} />
                  ))}
                </div>
              </>
            ),
            2: (
              <>
                <div className="text-wheels-tertiary mb-4 w-full rounded-sm border p-2">
                  <p className="mb-1 text-[10px] font-semibold">
                    TOTAL SYSTEM RENTED
                  </p>
                  <p className="text-xl font-bold">{totalSystemsRented}</p>
                </div>

                <div className="space-y-4">
                  {customersData.map((item) => (
                    <UserCard key={item.id} {...item} />
                  ))}
                </div>
              </>
            ),
          }[activeSlide]
        }
      </div>
    </div>
  );
}
