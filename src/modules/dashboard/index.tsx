"use client"
import BatteryIcon from "@/src/components/icons/BatteryIcon";
import CapsulesIcon from "@/src/components/icons/CapsulesIcon";
import InfoIcon from "@/src/components/icons/InfoIcon";
import RentalGraph from "./components/RentalGraph";
import AmbassadorCard from "./components/AmbassadorCard";
import ActivityLogCard from "./components/ActivityLogCard";
import CalendarIcon from "@/src/components/icons/CalendarIcon";

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

export default function Dashboard() {
  // const currentDate= new Date("2023-10-25")
  // console.log(currentDate)
  return(
    <div>
      <div className="flex items-center justify-between pb-6">
        <div>
          <p className="text-3xl font-medium">Welcome back, Daniel 👋</p>
          <span className="text-sm">See detailed analytics</span>
        </div>
        <p className="border flex items-center text-[#55707E] py-4 px-2">
          <span className="mr-2"><CalendarIcon/></span>
          Thurs 25th October,2023
        </p>
      </div>
      <div className="flex items-start space-x-5">
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
                null
                
              }
            </div>

            <AmbassadorCard/>
          </div>

          <div className="w-full shadow-lg">
              <RentalGraph/>
          </div>
        </div>

        <div className="w-2/5">
          <ActivityLogCard/>
        </div>
      </div>

    </div>
  ) 
}
