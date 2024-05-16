import Avatar from "@/public/assets/images/avatar.png"
import ChevronLeft from "@/src/components/icons/ChevronLeft";
import Image, { StaticImageData } from "next/image";
import { useEffect, useState } from "react";

type TAmbassadorsData = {
  id : number;
  image: StaticImageData;
  location: string;
  name: string;
  rentals: number;
}
const ambassadorsData : TAmbassadorsData[] = [
    { 
      id: 1,
      image: Avatar,
      location: "Mowe",
      name:"Gbenga Daniels",
      rentals: 48
    },
    {
      id: 2,
      image: Avatar,
      location: "Mushin",
      name: "Kolawole Ajaka",
      rentals: 48
    },
    {
      id: 3,
      image: Avatar,
      location: "Epe",
      name: "Cletus Mba",
      rentals: 48
    }
    ,
    {
      id: 4,
      image: Avatar,
      location: "Mowe",
      name: "Qudus Iyanda",
      rentals: 89
    }];

    const customersData :TAmbassadorsData[] = [
    {
      id: 1,
      image: Avatar,
      location: "Mowe",
      name: "Korede Daniels",
      rentals: 345
    }
    ,
    {
      id: 2,
      image: Avatar,
      location: "Mowe",
      name: "Gbenga Daniels",
      rentals: 128
    }
    ,
    {
      id: 3,
      image: Avatar,
      location: "Mowe",
      name: "Gbenga Daniels",
      rentals: 98
    },

    {
      id: 4,
      image: Avatar,
      location: "Mowe",
      name: "Gbenga Daniels",
      rentals: 48
    }]

export default function AmbassadorCard(){
  const[onCurrent, setOnCurrent] = useState(true);
  const[highestRentals, setHighestRentals] = useState<TAmbassadorsData | null>(null);
  
  const toggleOnCurrent = () =>{
    setOnCurrent(!onCurrent)
  }
  useEffect(() => {
    const findHighestRentals = () => {
      let highest = ambassadorsData[0];
      ambassadorsData.forEach((ambassador) => {
        if (ambassador.rentals > highest.rentals) {
          highest = ambassador;
        }
      });
      setHighestRentals(highest);
    };
    findHighestRentals();
  }, []);
    
    let totalRentals = 0
    customersData.forEach((customerData) =>{
      totalRentals+= customerData.rentals
    })
    return(
        <div className=" bg-white w-2/5 flex flex-col pt-3 pb-2 px-4 items-start border rounded-lg">
              <div className="w-full flex items-center justify-between">
                <h2 className="font-semibold">Top Performers</h2>
                <div className="flex items-center space-x-3">
                <button onClick={toggleOnCurrent}>
                  <span className={`${onCurrent ? "fill-wheels-primary": "fill-[#C2C2C2]"}`}><ChevronLeft/></span>
                </button>
                <button onClick={toggleOnCurrent} className="rotate-180">
                  <span className={`${onCurrent ? "fill-[#C2C2C2]" : "fill-wheels-primary"} `}><ChevronLeft/></span>
                </button>
                </div>
              </div>

              <p className="text-xs uppercase font-bold text-[#C2C2C2]">{onCurrent ? "Ambassadors" : "Customers"}</p>
              
                { onCurrent ?
                 (
                  highestRentals && (
                    <div className="flex w-full items-center rounded-sm space-x-2 border py-2 px-2">
                      <Image src={highestRentals.image} alt="avatar" />
                      <div>
                        <p className="mb-1 text-wheels-primary font-semibold">
                          {highestRentals.name}
                        </p>
                        <p className="uppercase text-[#C2C2C2] text-xs mb-1">
                          Rental Made
                        </p>
                        <p className="text-wheels-primary uppercase font-semibold">
                          {highestRentals.rentals} Systems
                        </p>
                      </div>
                    </div>
                  )
                  ):(
                  <div className="p-2 mt-2 border w-full">
                  <p className="uppercase text-xs text-[#C2C2C2]">Total System Rented</p>
                  <p className="text-2xl text-wheels-primary font-bold">{totalRentals}</p>
                  </div>
                  )
                }
            

              <div className="mt-1 w-full">
                {onCurrent ?
                  ambassadorsData.map(({id, name, rentals, location}) => 
                        id <= 4  && highestRentals?.name !== name ? (
                          <div key={id}>
                            <div className="flex flex-col mt-1 items-start space-y-1">
                              <div className="flex items-center space-x-2">
                                <span>{name}</span>
                                <li className="list-disc list-inside text-xs bg-[#EBEBF2] py-1 px-2 rounded-lg text-[#2F377D]">{location}</li>
                              </div>
                              <div className="flex items-center space-x-2">
                                <div className=" rounded-lg bg-[#ECF5FA] pr-2 w-full">
                                  <div className={` py-1 px-8 bg-wheels-primary rounded-lg`}>

                                  </div>
                                </div>
                                <span className="text-[#B9B9B9]">
                                  {rentals}
                                </span>
                              </div>
                            </div>
                          </div>
                        ) : null)
                          
                      :
                          customersData.map(({id, image, name, rentals, location}) =>
                            <div className="flex items-center space-x-2" key={id}>
                              <Image src={image} alt=""/>
                              <div className="flex flex-col items-start space-y-1">
                                <div className="flex items-center space-x-1">
                                  <span>{name}</span>
                                  <li className="list-disc list-inside bg-[#EBEBF2] py-1 px-2 text-xs rounded-lg text-[#2F377D]">{location}</li>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <div className="rounded-lg bg-[#ECF5FA] pr-2">
                                    <div className={` py-1 px-8 bg-wheels-primary rounded-lg`}>

                                    </div>
                                  </div>
                                  <span className="text-[#B9B9B9]">
                                    {rentals}
                                  </span>
                                </div>
                              </div>
                            </div>
                          )
      
                }
              </div> 
      </div> 
           
              
          
    )
}