import { Link } from "react-router-dom"
import { useAppContext } from "../context/appContext"
import SignOutBtn from "./logoutButton";


const Header= ()=>{
    const {isLoggedIn}=useAppContext();
    return(
        <div className="bg-blue-800 py-3">
            <div className="container mx-auto flex justify-between">
                <span className="text-2xl text-white font-bold tracking-tight">
                    <Link to="/">Holidays.com</Link>
                </span>
                <span className="flex space-x-2">
                    {
                        !isLoggedIn?(
                            <Link to="/login" className="flex items-center bg-white text-blue-600 rounded-md px-2 font-bold hover:bg-gray-100">Sign In</Link>
                        ):(
                            <div className="flex gap-4 items-center justify-center text-white">
                                <Link to='/my-bookings' className="hover:bg-white hover:text-blue-600 rounded-md px-1">My Bookings</Link>
                                <Link to='/my-hotels' className="hover:bg-white hover:text-blue-600 rounded-md px-1" >My Hotels</Link>
                                <SignOutBtn />
                            </div>
                            
                        )
                    }
                </span>
            </div>
        </div>
    )
}
export default Header