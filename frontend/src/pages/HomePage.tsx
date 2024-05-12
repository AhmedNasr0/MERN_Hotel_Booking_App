import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import LatestDestinationCard from "../Components/LatestCard"
import { HotelType } from "../shared";

const HomePage = () => {
const { data: hotels } = useQuery("fetchQuery", () =>
    apiClient.fetchMyHotels()
);
console.log(hotels);
if(!hotels || !Array.isArray(hotels)) return <>hello</>

const topRowHotels = hotels?.slice(0, 2) as HotelType[] || [];
const bottomRowHotels = hotels?.slice(2) as HotelType[] || [];


  return (
    <div className="space-y-3">
      <h2 className="text-3xl font-bold">Latest Destinations</h2>
      <p>Most recent desinations added by our hosts</p>
      <div className="grid gap-4">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          {topRowHotels.map((hotel) => (
            <LatestDestinationCard hotel={hotel} />
          ))}
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {bottomRowHotels.map((hotel) => (
            <LatestDestinationCard hotel={hotel} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;