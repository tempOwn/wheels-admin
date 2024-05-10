export default function RentalGraph (){
    return(
        <div className="bg-white">
            <div className="flex flex-col items-center space-y-2">
                <div className="flex items-center justify-between">
                    <p>157 Systems</p>
                    <div className="flex items-center space-x-2">
                      <span className="p-1 border">All Systems</span>  
                      <span className="p-1 border">Export as PDF</span>  
                      <span className="p-1 border">This Week</span>  
                    </div>
                </div>
               <span>Total Systems Rented</span>
               <span>24%</span>
               <span>Yesterday</span>
            </div>

        </div>
    )
}