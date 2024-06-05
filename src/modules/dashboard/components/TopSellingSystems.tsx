import Image, { StaticImageData } from "next/image";
import Capsules from "@/public/assets/images/reeddi-capsule.png";
import BigEnergy from "@/public/assets/images/reeddi-big-energy.png";
import EnergyBox from "@/public/assets/images/reeddi-energy-box.png";

type TTopSales = {
  id: number;
  name: string;
  sales: number;
  image: StaticImageData;
};

const topSales: TTopSales[] = [
  {
    id: 1,
    name: "Reeddi Capsules",
    sales: 345,
    image: Capsules,
  },
  {
    id: 2,
    name: "EnergyBOX",
    sales: 134,
    image: EnergyBox,
  },
  {
    id: 3,
    name: "BigEnergy",
    sales: 64,
    image: BigEnergy,
  },
];

const totalSales = topSales.reduce((sum, topSale) => sum + topSale.sales, 0);

export default function TopSellingSystems() {
  return (
    <div className="rounded-md border border-wheels-border-2 bg-white p-5">
      <p className="mb-3 font-semibold lg:text-lg">Top Selling Items</p>

      <div>
        {topSales.map(({ name, id, image, sales }, index) => (
          <div
            key={id}
            className={`flex items-center space-x-4 py-2 ${index !== topSales.length - 1 ? "border-b border-wheels-border-2" : ""}`}>
            <span className="font-bold">{id}</span>
            <div className="rounded-full bg-[#ECF5FA] p-2">
              <Image src={image} width={36} height={36} alt={name} />
            </div>

            <div className="w-full space-y-2">
              <p className="text-sm font-semibold">{name}</p>

              <div className="flex items-center space-x-2">
                <div className="h-2 w-full overflow-hidden rounded-[30px] bg-[#ECF5FA]">
                  <div
                    style={{
                      width: `${(sales / totalSales) * 100}%`,
                    }}
                    className="h-full w-2/3 bg-wheels-primary"
                  />
                </div>

                <div className="space-x-2 text-xs font-semibold text-wheels-grey">
                  <span>{sales}</span>
                  <span>
                    {"(" + Math.round((sales / totalSales) * 100) + "%)"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
