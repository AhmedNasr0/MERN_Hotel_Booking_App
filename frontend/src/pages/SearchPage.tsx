import { useQuery } from "react-query";
import { useSearchContext } from "../context/searchContext"
import { FetchHotels } from "../api-client";
import { ChangeEvent, useState } from "react";
import Pagination from "../Components/Pagination";
import SearchResultsCard from "../Components/searchResultCard";
import { HotelType } from "../shared";
import StarRatingFilter from "../Components/StarRatingFilter";
import HotelTypesFilter from "../Components/hotelTypes";
import HotelFacilitiesFilter from "../Components/hotelFacilities";
import PriceFilter from "../Components/PriceFilter";
import { RiMenuSearchLine } from "react-icons/ri";


const SearchPage=()=>{
    const search=useSearchContext();
    const [menu,setMenu]=useState(false);
    const [page,setPage]=useState<number>(1);
    const[selectedStars,setSelectedStars]=useState<string[]>([]);
    const[selectedTypes,setSelectedTypes]=useState<string[]>([]);
    const[selectedFacilities,setSelectedFacilities]=useState<string[]>([]);
    const [selectedMinPrice,setSelectedMinPrice]=useState<number>(0);
    const [selectedMaxPrice,setSelectedMaxPrice]=useState<number>(10000);
    const [sortOption,setSelectedSortOption]=useState<string>("");
    const searchParams={
        destination:search.destination.toString(),
        checkIn:search.checkIn.toISOString(),
        checkOut:search.checkOut.toISOString(),
        adultCount:search.adultCount.toString(),
        childCount:search.childCount.toString(),
        page:page.toString(),
        starRating:selectedStars,
        types:selectedTypes,
        facilities:selectedFacilities,
        minPrice:selectedMinPrice.toString(),
        maxPrice:selectedMaxPrice.toString(),
        sortOption:sortOption.toString()
    }
    const {data:hotels}=useQuery(["searchParams",searchParams],()=>FetchHotels(searchParams));
    const handleOnChangePage=(pageNum:number)=>{
        setPage(pageNum);
    }
    const handleStarsChange=(event: React.ChangeEvent<HTMLInputElement>)=>{
      const starRate=event.target.value

        setSelectedStars((prvstars)=>
          event.target.checked?[...prvstars,starRate]:prvstars?.filter((star)=>star!=starRate)
        )
    }
    const handleHotelTypesChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
      const typeSelect=event.target.value 
      setSelectedTypes((prvType)=> 
          event.target.checked?[...prvType,typeSelect] : prvType.filter((type)=> type!=typeSelect)
      )
    }
    const handleFacilityChange=(event:ChangeEvent<HTMLInputElement>)=>{
      const facilitySelected=event.target.value 
      setSelectedFacilities((prvfacility)=>event.target.checked?[...prvfacility,facilitySelected]:prvfacility.filter((facility)=>facility!=facilitySelected))
    }
    const handleOnChangeMaxPrice=(event:ChangeEvent<HTMLInputElement>)=>{
        setSelectedMaxPrice(parseInt(event.target.value))
    }
    const handleOnChangeMinPrice=(event:ChangeEvent<HTMLInputElement>)=>{
      setSelectedMinPrice(parseInt(event.target.value))
    }
    console.log(menu)
    return(
        <>
          <div className="flex flex-col md:flex-row gap-5">
                <div className={`${menu==true?"flex flex-col":"hidden"} md:flex-row md:flex md:w-[330px]  rounded-lg border border-slate-300 p-5 h-fit top-10`}>
                  <div className="space-y-5 ">
                    <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
                      Filter by:
                    </h3>
                    <StarRatingFilter
                      selectedStars={selectedStars}
                      onChange={handleStarsChange}
                    />
                    
                    <HotelTypesFilter
                      selectedTypes={selectedTypes}
                      onChange={handleHotelTypesChange}
                    />
                    
                    <HotelFacilitiesFilter 
                      selectedFacilities={selectedFacilities}
                      onChange={handleFacilityChange}
                    />
                    
                    <PriceFilter
                      selectedMaxPrices={selectedMaxPrice}
                      selectedMinPrices={selectedMinPrice}
                      onChangeMaxPrice={handleOnChangeMaxPrice}
                      onChangeMinPrice={handleOnChangeMinPrice}
                    />

                    <button onClick={()=>setMenu(false)} className="md:hidden w-full py-2 px-6 bg-blue-500 hover:bg-blue-400 text-white rounded-xl flex items-center justify-center">
                        Done
                    </button>
                  </div>
                </div>           
            <div className="flex flex-col gap-5">
            <div className="flex gap-2 justify-between items-center">
                <span className="text-xl w-1/2 font-bold">
                  {hotels?.totalReturnedHotels} Hotels found
                  {search.destination ? ` in ${search.destination}` : ""}
                </span>
                <div className="w-1/2 gap-2 sm:w-1/4 flex items-center justify-end">
                  <select
                    value={sortOption}
                    onChange={(event) => setSelectedSortOption(event.target.value)}
                    className="p-2 border w-3/4 md:w-full rounded-md"
                  >
                    <option value="">Sort By</option>
                    <option value="starRating">Star Rating</option>
                    <option value="pricePerNightAsc">
                      Price Per Night (low to high)
                    </option>
                    <option value="pricePerNightDesc">
                      Price Per Night (high to low)
                    </option>
                  </select>
                  <button  className="md:hidden" onClick={()=>setMenu(true)}>
                    <RiMenuSearchLine size={30} />
                  </button>
                </div>
              </div>
              {hotels?.data.map((hotel:HotelType) => (
                <SearchResultsCard hotel={hotel} />
              ))}
        <div>
          <Pagination
            page={hotels?.pageNumber || 1}
            pages={hotels?.totalPages || 1}
            onPageChange={handleOnChangePage}
          />
        </div>
            </div>
          </div>
        </>
    )
}
export default SearchPage