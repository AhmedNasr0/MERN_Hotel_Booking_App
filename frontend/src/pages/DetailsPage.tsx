import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "./../api-client";
import { AiFillStar } from "react-icons/ai";
import GuestInfoForm from "../forms/GuestinfoForm";
import Slider from "../Components/slider";

const Detail = () => {
  const { hotelId } = useParams();

  const { data: hotel } = useQuery(
    "fetchHotelById",
    () => apiClient.getHotelById(hotelId || ""),
    {
      enabled: !!hotelId,
    }
  );

  if (!hotel) {
    return <></>;
  }

  return (
    <div className="space-y-6">
      <div>
        <span className="flex">
          {Array.from({ length: hotel.starRating }).map(() => (
            <AiFillStar className="fill-yellow-400" />
          ))}
        </span>
        <h1 className="text-3xl font-bold">{hotel.name}</h1>
      </div>

      <div className="">
        <Slider images={hotel.imageUrls}/>
      </div>

      <div className="flex flex-wrap gap-2">
        {
        hotel.facilities.map((facility) => (
          <div className="border w-fit shadow-sm border-slate-300 rounded-xl p-3">
            {facility}
          </div>
        ))}
      </div>

      <div className="flex flex-col items-end w-full h-full md:flex-row  gap-10">
        <div className="whitespace-pre-line flex-1">{hotel.description}</div>
        <div className="w-full md:w-fit">
          <GuestInfoForm
            pricePerNight={hotel.pricePerNight}
            hotelId={hotel._id}
          />
        </div>
      </div>
    </div>
  );
};

export default Detail;