"use client"
import { Line } from 'react-chartjs-2';
import {CategoryScale} from 'chart.js'; 
import Chart from 'chart.js/auto';
import SortIcon from '@/src/components/icons/SortIcon';
import PdfIcon from '@/src/components/icons/PdfIcon';
import ToggleIcon from '@/src/components/icons/ToggleIcon';

export default function RentalGraph (){
    Chart.register(CategoryScale);
    const chartData = {
        labels:["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        datasets:[
            {
                label: "Reeddi capsules",
                data:[56, 42, 33, 38, 24],
                borderColor:"#10B981",
                borderWidth: 3
            },
            {
                label: "EnergyBox",
                data:[12, 22, 26, 31, 36],
                borderColor:"#2CCFF3",
                borderWidth: 3
            },
            {
                label: "BigEnergy",
                data:[10, 2, 15, 32, 11],
                borderColor:"#DEB887",
                borderWidth: 3
            }

        ]
    }
    return(
        <div className="bg-white px-8 rounded-lg py-4">
            <div className="flex flex-col items-start border-b-4 pt-4 pb-6 space-y-2">
                <div className="flex w-full items-center justify-between">
                    <p className="text-3xl font-bold">157 Systems</p>
                    <div className="flex items-center text-[#C2C2C2] space-x-2">
                      <button className="flex items-center space-x-2 p-1 border">
                        <span><SortIcon/></span>All Systems
                      </button>  
                      <button className="flex items-center space-x-2 p-1 border">
                        <span><PdfIcon/></span>Export as PDF
                      </button>  
                      <button className="flex items-center space-x-2 p-1 border">
                        <span><ToggleIcon/></span>This Week
                      </button>  
                    </div>
                </div>
                <div className="flex text-xs items-center space-x-2">
               <span>Total Systems rented</span>
               <p className="text-[#C2C2C2]">
                <span className="text-[#10B981]">24%</span>
                 Yesterday
               </p>
               </div>
            </div>
            <div className='py-8 px-4'>
                <Line data={chartData}/>
            </div>
        </div>
    )
}