"use client"
import { CopyIcon } from "@/src/components/icons/CopyIcon";
import CapsuleIcon from "@/src/components/icons/CapsuleIcon";
import WhatsappIcon from "@/src/components/icons/WhatsappIcon";
import { useEffect, useState } from "react"
import EmissionIcon from "@/src/components/icons/EmissionIcon";
import CircularCautionIcon from "@/src/components/icons/CircularCautionIcon";
import DeliveryIcon from "@/src/components/icons/DeliveryIcon";
import ClockIcon from "@/src/components/icons/ClockIcon";
import SlantArrowIcon from "@/src/components/icons/SlantArrowIcon";
import CustomerDp from "@/public/assets/images/customer-image.png";
import Image, { StaticImageData } from "next/image";

type TRentalDuration = {
    date: string;
    time: string;
  };
  
  type TActivity = {
    id: number;
    serialNumber: string;
    rentalDuration: TRentalDuration;
    returnDuration: TRentalDuration;
    status: string;
    ambassadorName: string;
    quantity: number;
  };
  
  type TCustomer = {
    name: string;
    image: StaticImageData;
    phoneNumber: string;
    emailAddress: string;
    homeAddress: string;
    status: string;
    totalRentals: number;
    topSystemRented: string;
    emissionSaved: string;
    lateReturns: number;
    earlyReturns: number;
    incidentReported: number;
    activities: TActivity[];
  };
  
 const customers: TCustomer[] =[
    {
        name: "Bosun Jr Gbadegbo",
        image: CustomerDp,
        phoneNumber: "+2348105628191",
        emailAddress: "gbadebobosun@gmail.com",
        homeAddress: "20 Rumuokoro Sreet, Rumuomasi, Ilupeju, Lagos",
        status: "Inactive",
        totalRentals: 45,
        topSystemRented: "EnergyBox",
        emissionSaved: "120 KgCo",
        lateReturns : 6,
        earlyReturns: 39,
        incidentReported: 4,
        activities:[
            {   id: 0,
                serialNumber: "RC-81240932",
                rentalDuration : {
                    date: "Friday, 25 Aug 2023",
                    time: "11:03am"
                },
                returnDuration: {
                    date: "Saturday, 26 Aug 2023",
                    time: "08:24am"
                },
                status: "returned",
                ambassadorName: "Daniel Benson",
                quantity: 1
            },
            {   id: 1,
                serialNumber: "RC-81240932",
                rentalDuration : {
                    date: "Monday, 21 Aug 2023",
                    time: "11:03am"
                },
                returnDuration: {
                    date: "Tuesday, 22 Aug 2023",
                    time: "08:24am"
                },
                status: "rented",
                ambassadorName: "Moses Abayomi",
                quantity: 1
            },
            {   id: 2,
                serialNumber: "RC-81240932",
                rentalDuration : {
                    date: "Friday, 25 Aug 2023",
                    time: "7:05am"
                },
                returnDuration: {
                    date: "Saturday, 26 Aug 2023",
                    time: "08:24am"
                },
                status: "returned",
                ambassadorName: "Daniel Benson",
                quantity: 1
            },
            {   id: 3,
                serialNumber: "RC-81240932",
                rentalDuration : {
                    date: "Tuesday, 29 Nov 2023",
                    time: "10:00am"
                },
                returnDuration: {
                    date: "Wednesday, 30 Nov 2023",
                    time: "08:40am"
                },
                status: "rented",
                ambassadorName: "Daniel Benson",
                quantity: 1
            }
        ]
    }
 ]
export default function CustomersProfile ({id = 0}:{id ?: number}){
    const[customer, setCustomer] = useState<null | TCustomer>(null)
    const[activity, setActivity] = useState<null |TActivity >(null)
    const getCustomerInfo = () =>{
        setCustomer(customers[id])    
    }
    useEffect(() => {
        getCustomerInfo()
    }, [])

    const getActivity= (id:number) =>{
        if (customer !== null) {
            setActivity(customer.activities[id])
        }
        
    }
    const copyValue = async (text : string) =>{
        navigator.clipboard.writeText(text)
    }
    return(
        customer &&(
            <div className="flex items-start space-x-5 px-8">
                <div className="flex bg-white flex-col w-1/2 space-y-2 px-8 py-7">
                    <h1 className="text-xl border-b font-semibold shadow-sm py-2">Customer's Profile</h1>
                    <div className="flex space-x-2 items-center ">
                        <Image src={CustomerDp} alt="Customer Image"/>
                        <div className="flex flex-col items-start space-y-1 w-1/3">
                            <p className="font-bold">{customer.name}</p>
                            <span className="py-1 px-2 rounded-lg bg-[#E8E3DD] text-xs text-[#8B7357]">
                                <li>Customer</li>
                            </span>
                        </div>
                        <div className="rounded-lg text-xs space-x-1 py-1 px-2 bg-[#FEEDED] text-wheels-error">
                            <li>{customer.status}</li>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center">
                        <div className="flex flex-col items-start p-2 w-[30%] shadow-md rounded-sm">
                        <span className="bg-[#10B981] p-1.5 mb-6 rounded-full"><DeliveryIcon/></span>
                        <p className="text-2xl text-wheels-primary mb-2 font-bold">{customer.totalRentals}</p>
                        <p className="text-sm">Total Rentals</p>
                        </div>

                        <div className="flex flex-col items-start p-2 w-[30%] shadow-md ml-4 rounded-sm">
                        <span className="bg-wheels-primary mb-6 p-1.5 rounded-full"><CapsuleIcon/></span>
                        <p className="text-2xl text-wheels-primary mb-2 font-bold">{customer.topSystemRented}</p>
                        <p className="text-sm">Top System Rented</p>
                        </div>

                        <div className="flex flex-col items-start p-2 w-[30%] shadow-md ml-4 rounded-sm">
                        <span className="bg-[#55707E] mb-6 p-1.5 rounded-full"><EmissionIcon/></span>
                        <p className="text-2xl text-wheels-primary mb-2 font-bold">{customer.emissionSaved}</p>
                        <p className="text-sm">Emission Saved</p>
                        </div>

                        <div className="flex flex-col items-start p-2 w-[30%] mt-4 shadow-md rounded-sm">
                        <span className="bg-[#0070B2] mb-6 p-1.5 rounded-full"><ClockIcon/></span>
                        <p className="text-2xl text-wheels-primary mb-2 font-bold">{customer.lateReturns}</p>
                        <p className="text-sm">Late Returns</p>
                        </div>

                        <div className="flex flex-col items-start p-2 w-[30%] mt-4 shadow-md ml-4 rounded-sm">
                        <span className="bg-[#F6AA29] mb-6 p-1.5 rounded-full"><ClockIcon/></span>
                        <p className="text-2xl text-wheels-primary mb-2 font-bold">{customer.earlyReturns}</p>
                        <p className="text-sm">Early Returns</p>
                        </div>

                        <div className="flex flex-col items-start p-2 w-[30%] mt-4 shadow-md ml-4 rounded-sm">
                        <span className="bg-[#55707E] mb-6 p-1.5 rounded-full"><CircularCautionIcon/></span>
                        <p className="text-2xl text-wheels-primary mb-2 font-bold">{customer.incidentReported}</p>
                        <p className="text-sm">Incident Reported</p>
                        </div>
                        
                    </div>

                    <div className="flex flex-col px-2 py-6 shadow-md space-y-2">
                        <div className="flex items-center spacce-x-2">
                                <label className="w-1/2">
                                    <span className="text-[#55707E]">Phone Number</span>
                                    <div className="border flex items-center space-x-2 rounded-lg pr-2">
                                        <input className=" w-full rounded-lg p-2" type="tel" value={customer.phoneNumber}/>
                                        <button><WhatsappIcon/></button>
                                    </div>
                                </label>
                            
                                <label className="w-1/2">
                                    <span className="text-[#55707E]">Email Address</span>
                                    <div className="flex items-center space-x-2 border pr-2 rounded-lg">
                                        <input className="w-full rounded-lg p-2" type="email" value={customer.emailAddress}/>
                                        <button onClick={() => copyValue(customer.emailAddress)}><CopyIcon/></button>
                                    </div>
                                    
                                </label>
                            
                        </div>

                            <label>
                                <span className="text-[#55707E]">Home Address</span>
                                <div className="border rounded-lg">
                                    <input className=" rounded-lg w-full p-2" type="text" value={customer.homeAddress}/>
                                </div>
                            </label>
                    </div>

                    <div>
                        <div className="flex items-center py-5 justify-between">
                            <p className="font-semibold">Customer Activities</p>
                            <button className="text-xs">View all</button>
                        </div>
                        <div className="flex flex-col w-full items-start">
                            {
                                customer.activities.map( ({serialNumber, status, id, rentalDuration}) =>
                                    <button key={id} onClick={() => getActivity(id)} className="flex w-full py-2 border-b justify-between items-center">
                                        <div className="flex items-center space-x-2">
                                        <span className={` p-2 rounded-full ${status === "returned" ? "bg-[#CCECFF]" :"bg-[#E8E3DD] rotate-180 text-[#8B7357]"}`}>
                                            <SlantArrowIcon/>
                                        </span>
                                        <p className="font-bold">{ serialNumber +(status === "returned" ? " Returned" : " Rented out")}</p>
                                        </div>
                                        <span className="text-[#B5B5B8] text-sm">{rentalDuration.date}</span>
                                        <span className="text-[#B5B5B8] text-sm">{rentalDuration.time}</span>
                                    </button>
                                )
                            }
                        </div>
                       
                    </div>
                </div>
                {
                activity &&(
                        <div className=" bg-white px-3 py-5 w-1/4 flex flex-col items-start space-y-2">
                            <span className={`p-5 m-[auto] rounded-full ${activity.status === "returned" ? "bg-[#CCECFF]" :"bg-[#E8E3DD] rotate-180 fill-[#8B7357]"}`}>
                                <SlantArrowIcon/>
                            </span>
                            <p className="m-[auto] text-lg font-bold pb-6">{activity.status === "returned" ? "Capsule Returned" : "Capsule Rented"}</p>
                            <p className="border-b pb-2">
                                {
                                    "Capsule " + activity.serialNumber + (activity.status == "returned" ? " was returned to " : " was rented to ") + customer.name
                                }
                            </p>
                            <div className=" w-full flex flex-col items-start space-y-2 pb-2 border-b">
                                <span className="text-sm">Time of Rental</span>
                                <p className="font-semibold">{activity.rentalDuration.time + " - " + activity.rentalDuration.date}</p>
                            </div>
                            {
                                activity.status === "returned" ? 
                                <div className=" w-full flex flex-col items-start space-y-2 pb-2 border-b">
                                    <span className="text-sm">Time of Return</span>
                                    <p className="font-semibold">{activity.returnDuration.time + " - " + activity.returnDuration.date}</p>
                                </div>
                                :
                                <div>
                                </div>
                            }
                            
                            <div className=" w-full flex flex-col items-start space-y-2 pb-2 border-b">
                                <span className="text-sm">Expected Time of Return</span>
                                <p className="font-semibold">{activity.returnDuration.time + " - " + activity.returnDuration.date}</p>
                            </div>
                            <div className=" w-full flex flex-col items-start space-y-2 pb-2 border-b">
                                <span className="text-sm">Customer's Name</span>
                                <div className="flex items-center space-x-2">
                                <p className="font-semibold">{customer.name}</p>
                                </div>
                            </div>
                            <div className=" w-full flex flex-col items-start space-y-2 pb-2 border-b">
                                <span className="text-sm">Ambassador's Name</span>
                                <div className="flex items-center space-x-2">
                                <p className="font-semibold">{activity.ambassadorName}</p>
                                </div>
                            </div>
                            <div className=" w-full flex flex-col items-start space-y-2 pb-2 border-b">
                                <span className="text-sm">Quantity of Capsules Returned</span>
                                <p className="font-semibold">{activity.quantity}</p>
                            </div>
                            <div className=" w-full flex flex-col items-start space-y-2 pb-2 border-b">
                                <span className="text-sm">Serial Number of Capsules</span>
                                <div className="flex  w-full items-center justify-between">
                                    <p className="font-semibold">{activity.serialNumber}</p>
                                    <button onClick={() => copyValue(activity.serialNumber)}><CopyIcon/></button>
                                </div>
                            </div>
                            <div className=" w-full flex flex-col items-start space-y-2 pb-2 border-b">
                                <span className="text-sm">Ambassador Recieve</span>
                                <p className="font-semibold">{`#${500 * activity.quantity}`}</p>
                            </div>
                            <div className=" w-full flex flex-col items-start space-y-2 pb-2 border-b">
                                <span className="text-sm">Holding Fee</span>
                                <p className="font-semibold">#1000</p>
                            </div>
                        </div>
                    )
                }
            </div>
        )
    )
}