import BatteryIcon from "@/src/components/icons/BatteryIcon";
import CapsulesIcon from "@/src/components/icons/CapsulesIcon";
import InfoIcon from "@/src/components/icons/InfoIcon";
import RentalGraph from "./components/RentalGraph";
import Image from "next/image";

type Tanalytics = {
  icon: React.ReactNode | string;
  category: string;
  value: number;
  change?: number
}
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
    image: "",
    title: "Customer Registration",
    message: "Amb. Edmund Doyle added a new customer, Your approval is needed.",
    time: "58 minutes ago"
  },
  {
    image: "",
    title: "Customer Registration",
    message: "Amb. Edmund Doyle added a new customer, Your approval is needed.",
    time: "58 minutes ago"
  },
  {
    image: "",
    title: "Customer Registration",
    message: "Amb. Edmund Doyle added a new customer, Your approval is needed.",
    time: "58 minutes ago"
  },
  {
    image: "",
    title: "Customer Registration",
    message: "Amb. Edmund Doyle added a new customer, Your approval is needed.",
    time: "58 minutes ago"
  },
  {
    image: "",
    title: "Customer Registration",
    message: "Amb. Edmund Doyle added a new customer, Your approval is needed.",
    time: "58 minutes ago"
  }
]
const topSales = [
  {
    id: 1,
    name: "Reeddi Capsules",
    sales: 345,
    image: ""
  },
  {
    id: 2,
    name: "EnergyBOX",
    sales: 134,
    image: ""
  },
  {
    id: 3,
    name: "BigEnergy",
    sales: 64,
    image: ""
  }
]
export default function Dashboard() {
  const currentDate= new Date("2023-10-25")

  return(
    <div>
      <div className="flex items-center justify-between">
        <div>
          <p>Welcome back, Daniel 👋</p>
          <span>See detailed analytics</span>
        </div>
        <span className="border">
          {/* {currentDate} */}
        </span>
      </div>
      <div className="flex items-center space-x-5">
        <div className=" w-2/3 space-y-5">
          <div className="flex items-center space-x-5">
            <div className="flex items-center space-x-5">
              {
                analytics ? 
                analytics.map(({category, icon, value, change}:Tanalytics) =>
                  <div key={category} className="border bg-white w-1/2 rounded-sm">
                    <div className="flex items-center justify-between p-4">
                      <span className={`p-1 rounded-full ${category === "System transferred" ? "bg-wheels-primary" :
                       category === "Rentals" ? "bg-[#10B981]":
                        category === "System returned" ? "bg-[#53C5D3]" :
                         "bg-wheels-error" }`}>
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
                      <p className="text-wheels-primary">{value}</p>
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

            <div className=" bg-white flex flex-col items-center border rounded-sm space-x-3 ">
              <div className="flex items-center justify-betwwen">
                <h2>Top Performers</h2>
                <div>
                <button></button>
                <button></button>
                </div>
              </div>
              <p>Ambassadors</p>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="mb-1">Qudus Iyanda</p>
                  <p>Rental Made</p>
                  <p className="text-wheels-primary capitalize">89 Systems</p>
                </div>

              </div>
            </div>
          </div>

          <div className="w-full">
              <RentalGraph/>
          </div>
        </div>

        <div>
          <div className="bg-white">
            <div className="flex items-center justify-between">
              <p>Activity Log</p>
              <button>
                View all
              </button>
            </div>
            <div>
              { activityLogs.map(({image, title, time, message}) =>
                <div key={title} className="flex items-center border-t space-x-2">
                  <Image src={image} alt={title}/>
                  <div className="flex flex-col items-center space-y-2">
                    <div className="flex items-center space-x-1">
                      <p>{title}</p>
                      <span>{time}</span>
                    </div>
                    <p>{message}</p>
                  </div>
                </div>
              )
              }
            </div>

          </div>
          
          <div>
              <p>Top Selling Items</p>
              <div>
                {
                  topSales.map(({name, id, image, sales})=>
                    <div key={id} className="flex items-center space-x-2">
                      <span>{id}</span>
                      <Image src={image} alt={name}/>
                      <div key={id}>
                        <p>{name}</p>
                        <div>
                          <div className="h-[10px] rounded-lg">
                            <div className=" h-full bg-wheels-primary rounded-lg">
                              
                            </div>
                          </div>
                          <span>{sales}</span>
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
