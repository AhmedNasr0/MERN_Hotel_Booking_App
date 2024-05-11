export type HotelType={
    _id: string;
  userId: string;
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  adultCount: number;
  childCount: number;
  facilities: string[];
  pricePerNight: number;
  starRating: number;
  imageUrls: string[];
  lastUpdated: Date;
}
export type user={
  _id:string,
  email:string,
  password:string,
  firstName:string,
  lastName:string,
}
export type BookingFormDataType={
  hotelId: string;
  firstName: string;
  lastName: string;
  email: string;
  adultCount: number;
  childCount: number;
  checkIn:string,
  checkOut:string,
  totalCost:number ,
  paymentIntentId:string
}