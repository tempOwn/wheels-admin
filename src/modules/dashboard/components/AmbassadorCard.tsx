import Avatar from "@/public/assets/images/avatar.png"
import ChevronLeft from "@/src/components/icons/ChevronLeft";
import Image, { StaticImageData } from "next/image";
import { useState } from "react";

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
      name: "Korede Daniels",
      rentals: 345
    }
    ,
    {
      id: 5,
      image: Avatar,
      location: "Mowe",
      name: "Gbenga Daniels",
      rentals: 128
    }
    ,
    {
      id: 6,
      image: Avatar,
      location: "Mowe",
      name: "Gbenga Daniels",
      rentals: 98
    }
    ,
    {
      id: 7,
      image: Avatar,
      location: "Mowe",
      name: "Gbenga Daniels",
      rentals: 48
    }
    
  ]

export default function AmbassadorCard(){
  const[onCurrent, setOnCurrent] = useState(true);
  
  const toggleOnCurrent = () =>{
    setOnCurrent(!onCurrent)
  }
   let highestRentals = ambassadorsData[0]
    ambassadorsData.forEach((ambassadorData) =>{
      if (highestRentals.rentals > ambassadorData.rentals){
        highestRentals = ambassadorData
      }
    }
    )
    
    let totalRentals = 0
    ambassadorsData.forEach((ambassadorData) =>{
      totalRentals+= ambassadorData.rentals
    })
    return(
        <div className=" bg-white w-2/5 flex flex-col pt-3 pb-2 px-4 items-start border rounded-lg">
              <div className="w-full flex items-center justify-between">
                <h2 className="font-semibold">Top Performers</h2>
                <div className="flex items-center space-x-3">
                <button onClick={toggleOnCurrent}>
                  <span className={`${onCurrent ? "stroke-wheels-primary fill-wheels-primary": "stroke-[#C2C2C2]"}`}><ChevronLeft/></span>
                </button>
                <button onClick={toggleOnCurrent} className="rotate-180">
                  <span className={`${onCurrent ? "stroke-[#C2C2C2]" : "stroke-wheels-primary"} `}><ChevronLeft/></span>
                </button>
                </div>
              </div>

              <p className="text-xs uppercase font-bold text-[#C2C2C2]">Ambassadors</p>
              
                { onCurrent ?
                  <div className="flex w-full items-center rounded-sm space-x-2 border py-2 px-2">
                  <Image src={Avatar} alt="avatar"/>
                  <div>
                    <p className="mb-1 text-wheels-primary font-semibold mb-2">{highestRentals.name}</p>
                    <p className="uppercase text-[#C2C2C2] text-xs mb-1">Rental Made</p>
                    <p className="text-wheels-primary uppercase font-semibold">{highestRentals.rentals} Systems</p>
                  </div>
                  </div>
  
               
                :
                  <div className="p-2 border w-full">
                  <p className="uppercase text-xs text-[#C2C2C2]">Total System Rented</p>
                  <p className="text-2xl text-wheels-primary font-bold">{totalRentals}</p>
                  </div>
                }
            

              <div className="mt-1">
                {
                  ambassadorsData.map(({id, image, name, rentals, location}) => 
                    onCurrent ?
                    id < 4 ?
                  <div className="flex items-center space-x-2" key={id}>
                    <Image src={image} alt=""/>
                    <div className="flex flex-col mt-1 items-start space-y-1">
                      <div className="flex items-center space-x-1">
                        <span>{name}</span>
                        <li className="list-disc list-inside text-xs bg-[#EBEBF2] py-1 px-2 rounded-lg text-[#2F377D]">{location}</li>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className=" rounded-lg bg-[#ECF5FA] w-full">
                          <div className={` py-2 px-6 bg-wheels-primary rounded-lg`}>

                          </div>
                        </div>
                        <span className="text-[#B9B9B9]">
                          {rentals}
                        </span>
                      </div>
                    </div>
                  </div>
                  :
                  null
                  :
                  id > 3 ?
                  <div className="flex items-center space-x-2" key={id}>
                    <Image src={image} alt=""/>
                    <div className="flex flex-col items-start space-y-1">
                      <div className="flex items-center space-x-1">
                        <span>{name}</span>
                        <li className="list-disc list-inside bg-[#EBEBF2] py-1 px-2 text-xs rounded-lg text-[#2F377D]">{location}</li>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="h-[10px] rounded-lg bg-[#ECF5FA] w-full">
                        <div className={` h-full bg-wheels-primary rounded-lg`}>

                        </div>
                        </div>
                        <span className="text-[#B9B9B9]">
                          {rentals}
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
           
              
          
    )
}