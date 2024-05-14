type Props={
    selectedMinPrices:number 
    selectedMaxPrices:number 
    onChangeMinPrice:(event:React.ChangeEvent<HTMLInputElement>)=>void 
    onChangeMaxPrice:(event:React.ChangeEvent<HTMLInputElement>)=>void
}
const HotelFacilitiesFilter=({selectedMaxPrices,selectedMinPrices,onChangeMaxPrice,onChangeMinPrice}:Props)=>{
    return(
        <div className="border-b border-slate-300 pb-5 ">
            <h1 className="text-md font-semibold mb-2">Hotel Prices</h1>
            <div className="flex flex-col gap-5">
                <div className="flex flex-col">
                    <label className="flex-1">Minimum Price : {selectedMinPrices}$</label>
                    <input type="range" min={0} max={1000} className=" border rounded-md" onChange={onChangeMinPrice} value={selectedMinPrices} />
                </div>
                <div className="flex flex-col">
                    <label className="flex-1">Maximum Price : {selectedMaxPrices}$</label>
                    <input type="range" min={0} max={10000} className="border rounded-md" onChange={onChangeMaxPrice} value={selectedMaxPrices} />
                </div>
            </div>
        </div>
    )
}
export default HotelFacilitiesFilter