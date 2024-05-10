import BatteryIcon from "@/src/components/icons/BatteryIcon";
import CapsulesIcon from "@/src/components/icons/CapsulesIcon";
import InfoIcon from "@/src/components/icons/InfoIcon";
import RentalGraph from "./components/RentalGraph";
import Image from "next/image";
import Capsules from  "../../../public/assets/images/reeddi_capsule.png";
import BigEnergy from "../../../public/assets/images/big_energy.png";
import EnergyBox from  "../../../public/assets/images/reeddi_energy_box.png"
import Avatar from "../../../public/assets/images/avatar.png"
import ChevronLeft from "@/src/components/icons/ChevronLeft";

type Tanalytics = {
  icon: React.ReactNode | string;
  category: string;
  value: number;
  change?: number
}
const ambassadorData = [
  { 
    id: 1,
    image: Avatar,
    location: "Mowe",
    name:"Gbenga Daniels",
    sales: 48
  },
  {
    id: 2,
    image: Avatar,
    location: "Mowe",
    name: "Kolawole Ajaka",
    sales: 48
  },
  {
    id: 3,
    image: Avatar,
    location: "Mowe",
    name: "Cletus Mba",
    sales: 48
  }
  ,
  {
    id: 4,
    image: Avatar,
    location: "Mowe",
    name: "Qudus Iyanda",
    sales: 89
  }
  
]
    

const analytics :Tanalytics[] = [
  {
    icon: <CapsulesIcon/>,
    category: "System transferred",
    value: 46,
    change: 24
  },
  {
    icon: <CapsulesIcon/>,
    category: "Rentals",
    value: 12,
    change: 17
  },
  {
    icon: <CapsulesIcon/>,
    category: "System returned",
    value: 46
  },
  {
    icon: <BatteryIcon/>,
    category: "Faulty System",
    value: 46
  }
]
const activityLogs = [
  {
    image: Avatar,
    title: "Customer Registration",
    message: "Amb. Edmund Doyle added a new customer, Your approval is needed.",
    time: "58 minutes ago",
    opened: false
  },
  {
    image: Avatar,
    title: "Ambassador Registration",
    message: "You just registered a new ambassador to the team. AMB-MOW2345",
    time: "58 minutes ago",
    opened: true
  },
  {
    image: BigEnergy,
    title: "Asset",
    message: "Big Energy has been added to your inventory.",
    time: "34 minutes ago",
    opened: false
  },
  {
    image: Avatar,
    title: "Team Member",
    message: "You just registered a new ambassador to the team. AMB-MOW2345",
    time: "58 minutes ago",
    opened: true
  },
  {
    image: Avatar,
    title: "Customer Registration",
    message: "I will like to change my address on my profile to 34, Funsho Williams Ave, Ikeja, Lagos.",
    time: "58 minutes ago",
    opened: true
  }
]
const topSales = [
  {
    id: 1,
    name: "Reeddi Capsules",
    sales: 345,
    change: 66,
    image: Capsules
  },
  {
    id: 2,
    name: "EnergyBOX",
    sales: 134,
    change: 28,
    image: EnergyBox
  },
  {
    id: 3,
    name: "BigEnergy",
    sales: 64,
    change: 6,
    image: BigEnergy
  }
]
export default function Dashboard() {
  const currentDate= new Date("2023-10-25")

  return(
    <div>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-3xl font-medium">Welcome back, Daniel 👋</p>
          <span className="text-sm">See detailed analytics</span>
        </div>
        <span className="border py-4 px-2">
          Thurs 25th October,2023
        </span>
      </div>
      <div className="flex items-center space-x-5">
        <div className=" w-2/3 space-y-5">
          <div className="flex items-center space-x-3">
            <div className="flex flex-wrap items-center w-2/3">
              {
                analytics ? 
                analytics.map(({category, icon, value, change}:Tanalytics) =>
                  <div key={category} className="border bg-white mr-2 mb-2 p-4 w-[48%] rounded-lg">
                    <div className="flex items-center justify-between mb-8">
                      <span className={`rounded-full ${category === "System transferred" ? "bg-wheels-primary p-1" :
                       category === "Rentals" ? "bg-[#10B981] p-1":
                        category === "System returned" ? "bg-[#53C5D3] p-1" :
                         "bg-wheels-error p-2" }`}>
                          {icon}
                      </span>
                      <div className="flex items-center space-x-1">
                        <span className={`${change === 24 ? "text-[#10B981]" : "text-wheels-error"}`}>
                          {change ? change + "%" : null}
                        </span>
                        <p>{category === "System transferred" || "Rentals" ? "Yesterday" : null}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-wheels-primary text-4xl font-bold">{value}</p>
                      <div className="flex items-center justify-between">
                        <p>{category}</p>
                        <span><InfoIcon/></span> 
                      </div>
                    </div>
                  </div>
                )
                :
                <div>

                </div>
                
              }
            </div>

            <div className=" bg-white w-2/5 flex flex-col pt-3 pb-2 px-4 items-start border rounded-lg">
              <div className="w-full flex items-center justify-between">
                <h2 className="font-semibold">Top Performers</h2>
                <div className="flex items-center space-x-3">
                <button className="text-[#C2C2C2]"><ChevronLeft/></button>
                <button className="text-wheels-primary rotate-180"><ChevronLeft/></button>
                </div>
              </div>
              <p className="text-xs uppercase font-bold text-[#C2C2C2]">Ambassadors</p>
              <div className="flex w-full items-center rounded-sm border space-x-2 py-2 px-2">
                <Image src={Avatar} alt="avatar"/>
                <div>
                  <p className="mb-1 text-wheels-primary font-semibold mb-2">Qudus Iyanda</p>
                  <p className="uppercase text-[#C2C2C2] text-xs mb-1">Rental Made</p>
                  <p className="text-wheels-primary uppercase font-semibold">89 Systems</p>
                </div>

              </div>
              <div className="mt-1">
                {
                  ambassadorData.map(({id, image, name, sales, location}) => 
                    id < 4 ?
                  <div className="flex items-center space-x-2" key={id}>
                    <Image src={image} alt=""/>
                    <div className="flex flex-col items-start space-y-1">
                      <div className="flex items-center space-x-1">
                        <span>{name}</span>
                        <li className="list-disc list-inside bg-[#EBEBF2] py-1 px-2 text-sm rounded-lg text-[#2F377D]">{location}</li>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="h-[10px] rounded-lg bg-[#ECF5FA] w-full">
                        <div className={` h-full bg-wheels-primary rounded-lg`}>

                        </div>
                        </div>
                        <span className="text-[#B9B9B9]">
                          {sales}
                        </span>
                      </div>
                    </div>
                  </div>
                  :
                  null
                  )
                }
              </div>
            </div>
          </div>

          <div className="w-full">
              <RentalGraph/>
          </div>
        </div>

        <div className="w-2/5">
          <div className="bg-white rounded-md p-6">
            <div className="flex items-center mb-8 justify-between">
              <p className="text-lg ttext-wheels-primary font-semibold">Activity Log</p>
              <button className="text-sm">
                View all
              </button>
            </div>
            <div>
              { activityLogs.map(({image, title, time, message, opened}) =>
                <div key={title} className="flex items-center mb-2.5 pt-2 border-t space-x-2">
                  {
                    title === "Asset" ?
                    <span className="p-3 rounded-full bg-[#ECF5FA]">
                       <Image src={image} width={36} height={30} alt={title}/>
                    </span>
                    :
                    <Image src={image} alt={title}/>
                  }
                 
                  <div className="flex flex-col items-center space-y-2">
                    <div className="flex w-full items-center text-sm space-x-1">
                      <p className="text-[#8D8D8D] font-bold">{title}</p>
                      <li className="list-disc text-[#C2C2C2]">{time}</li>
                    </div>
                    <p className={`${opened ? "#8D8D8D" : "text-wheels-primary font-semibold"}`}>{message}</p>
                  </div>
                </div>
              )
              }
            </div>

          </div>
          
          <div className="bg-white p-4">
              <p className="text-lg font-semibold mb-6">Top Selling Items</p>
              <div>
                {
                  topSales.map(({name, id, image, sales, change})=>
                    <div key={id} className="flex items-center border-b py-2 space-x-2">
                      <span className="font-bold">{id}</span>
                      <div className="rounded-full p-2 bg-[#ECF5FA]">
                      <Image src={image} width={36} height={36} alt={name}/>
                      </div>
                      <div className="flex flex-col items-start space-y-2">
                        <p className="text-sm font-semibold ">{name}</p>
                        <div className="flex items-center space-x-1">
                          <div className="h-[10px] rounded-lg bg-[#ECF5FA] w-full">
                            <div className={` h-full bg-wheels-primary rounded-lg`}>
                              
                            </div>
                          </div>
                          <span className="text-sm text-[#C2C2C2]">{sales}</span>
                          <span className="text-sm text-[#C2C2C2]">{`(${change}%)`}</span>
                        </div>
                      </div>
                    </div>
                  )
                }
              </div>
          </div>
        </div>
      </div>

    </div>
  ) 
}
