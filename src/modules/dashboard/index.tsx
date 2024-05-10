import BatteryIcon from "@/src/components/icons/BatteryIcon";
import CapsulesIcon from "@/src/components/icons/CapsulesIcon";
import InfoIcon from "@/src/components/icons/InfoIcon";

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
  const currentDate= new Date("Thurs 25th October,2023")

  return(
    <div>
      <div className="flex items-center justify-between">
        <div>
          <p>Welcome back, Daniel 👋</p>
          <span>See detailed analytics</span>
        </div>
        <span className="border">
          {currentDate}
        </span>
      </div>
      <div className="flex items-center space-x-5">
        <div className=" w-2/3 space-y-5">
          <div className="flex items-center space-x-5">
            <div className="flex flex-wrap items-center space-x-5">
              {
                analytics ? 
                analytics.map(({category, icon, value, change}:Tanalytics) =>
                  <div key={category} className="border w-1/2 rounded-sm">
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

            <div className="flex flex-col items-center border rounded-sm space-x-3 ">
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

          <div>

          </div>
        </div>

        <div>
          <div>

          </div>
          
          <div>

          </div>
        </div>
      </div>

    </div>
  ) 
}
