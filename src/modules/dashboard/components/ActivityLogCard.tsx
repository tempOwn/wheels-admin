import Image, { StaticImageData } from "next/image";
import Capsules from  "@/public/assets/images/reeddi_capsule.png";
import BigEnergy from "@/public/assets/images/big_energy.png";
import EnergyBox from  "@/public/assets/images/reeddi_energy_box.png"
import Avatar from "@/public/assets/images/avatar.png"
import { useState } from "react";
import DoubleTickIcon from "@/src/components/icons/DoubleTickIcon";
import WheelIcon from "@/src/components/icons/WheelIcon";

type TActivityLogs = {
  id : number;
  image: StaticImageData;
  title: string;
  message: string;
  time: string;
  opened: boolean;
}
 
type TTopSales = {
  id: number;
  name: string;
  sales: number;
  image: StaticImageData;
}

const activityLogs :TActivityLogs[] = [
    {
      id: 1,
      image: Avatar,
      title: "Customer Registration",
      message: "Amb. Edmund Doyle added a new customer, Your approval is needed.",
      time: "58 minutes ago",
      opened: false
    },
    {
      id: 2,
      image: Avatar,
      title: "Ambassador Registration",
      message: "You just registered a new ambassador to the team. AMB-MOW2345",
      time: "58 minutes ago",
      opened: true
    },
    {
      id: 3,
      image: BigEnergy,
      title: "Asset",
      message: "Big Energy has been added to your inventory.",
      time: "34 minutes ago",
      opened: false
    },
    {
      id: 4,
      image: Avatar,
      title: "Team Member",
      message: "You just registered a new ambassador to the team. AMB-MOW2345",
      time: "58 minutes ago",
      opened: true
    },
    {
      id: 5,
      image: Avatar,
      title: "Customer Registration",
      message: "I will like to change my address on my profile to 34, Funsho Williams Ave, Ikeja, Lagos.",
      time: "58 minutes ago",
      opened: true
    },
    {
      id: 6,
      image: Avatar,
      title: "Team Member",
      message: "You just registered a new ambassador to the team. AMB-MOW2345",
      time: "58 minutes ago",
      opened: true
    },
    {
        id: 7,
        image: Avatar,
        title: "Customer Registration",
        message: "I will like to change my address on my profile to 34, Funsho Williams Ave, Ikeja, Lagos.",
        time: "58 minutes ago",
        opened: true
    },
    {
        id: 8,
        image: Avatar,
        title: "Team Member",
        message: "You just registered a new ambassador to the team. AMB-MOW2345",
        time: "58 minutes ago",
        opened: true
    }

      
  ]
  const topSales: TTopSales[] = [
    {
      id: 1,
      name: "Reeddi Capsules",
      sales: 345,
      image: Capsules
    },
    {
      id: 2,
      name: "EnergyBOX",
      sales: 134,
      image: EnergyBox
    },
    {
      id: 3,
      name: "BigEnergy",
      sales: 64,
      image: BigEnergy
    }
  ]

export default function ActivityLogCard() {
    const[isVisible, setIsVisible] = useState(false)
    const toggleVisibility = () =>{
      setIsVisible(!isVisible)
    }
    let firstFiveActivities = activityLogs.slice(0,5)
    
    let totalSales = 0
    topSales.forEach((topSale) =>{
      totalSales+= topSale.sales
    })

    return(
        <>
            <div className="bg-white rounded-md p-6">
                <div className="flex items-center mb-8 justify-between">
                <p className="text-lg ttext-wheels-primary font-semibold">Activity Log</p>
                <button onClick={toggleVisibility} className="text-sm">
                    View all
                </button>
                </div>
                <div>
                { 
                  firstFiveActivities.map(({id,image, title, time, message, opened}) =>
                      <div key={id} className="flex items-center mb-2.5 pt-2 border-t space-x-2">
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
                      <span className={`${opened ? "hidden":""} rounded-full bg-wheels-primary p-1`}></span>
    
                      </div>
                  )
                }
                </div>

            </div>
            {/* <div className={`${isVisible ? "" : "hidden"} bg-white w-2/5 absolute border rounded-lg top-20 right-40 flex items-start flex-col space-y-2`}>
              <div className="flex w-full items-center justify-between pl-6 py-5 pr-5">
                <p className="text-wheels-primary font-semibold text-lg">Notifications</p>
                <div className="flex items-center space-x-2">
                  <span><DoubleTickIcon/></span>
                  <span><WheelIcon/></span>
                </div>
              </div>
              <nav className="flex w-full items-center list-none border-b pb-0 space-x-8 px-6">
                <li>All</li>
                <li>Inbox</li>
                <li>BlackList Request </li>
                <li>Incident Reports</li>
              </nav>
              <div>
                {
                  activityLogs.map(({id, image, title, time, message, opened}) =>
                    <div key={id} className="flex flex-col items-start py-2 px-6 border-b">
                      <div className="flex items-center space-x-2">
                        {
                            title === "Asset" ?
                            <span className="p-3 rounded-full bg-[#ECF5FA]">
                            <Image src={image} width={36} height={30} alt={title}/>
                            </span>
                            :
                            <Image src={image} alt={title}/>
                        }
                        <p className={`${opened ? "#8D8D8D" : "text-wheels-primary font-semibold"}`}>{message}</p>
                        <span className={`${opened ? "hidden":""} rounded-full bg-wheels-primary p-1`}></span>
    
                      </div>
                      <p className="text-[#C2C2C2] ml-10">{time}</p>
                    </div>
                  )
                }
              </div>
            </div> */}
            
            <div className="bg-white p-4">
                <p className="text-lg font-semibold mb-6">Top Selling Items</p>
                <div>
                    {
                    topSales.map(({name, id, image, sales})=>
                        <div key={id} className="flex items-center border-b py-2 space-x-2">
                        <span className="font-bold">{id}</span>
                        <div className="rounded-full p-2 bg-[#ECF5FA]">
                        <Image src={image} width={36} height={36} alt={name}/>
                        </div>
                        <div className="flex flex-col items-start space-y-2">
                            <p className="text-sm font-semibold ">{name}</p>
                            <div className="flex items-center space-x-1">
                            <div className="rounded-lg bg-[#ECF5FA] pr-2">
                                <div className={` py-1 px-8 bg-wheels-primary rounded-lg`}>

                                </div>
                            </div>
                            <span className="text-sm text-[#C2C2C2]">{sales}</span>
                            <span className="text-sm text-[#C2C2C2]">{"(" + Math.round((sales/totalSales) * 100)+ "%)"}</span>
                            </div>
                        </div>
                        </div>
                    )
                    }
                </div>
            </div>
        </>
    )
    
}