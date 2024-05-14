import { Link } from "react-router-dom"
import { useAppContext } from "../context/appContext"
import SignOutBtn from "./logoutButton";


const Header= ()=>{
    const {isLoggedIn}=useAppContext();
    return(
        <div className="bg-blue-500 px-4 py-4 w-full">
            <div className="container mx-auto flex flex-col items-center gap-2 justify-between">
                <span className="flex items-center w-full justify-between">
                    <Link to="/" className="text-xl sm:text-2xl text-white font-bold tracking-tight">Holidays.com</Link>
                    { isLoggedIn? <SignOutBtn /> : 
                        <Link to="/login" className="flex items-center bg-white text-blue-500 rounded-md px-2 font-bold hover:bg-gray-100">Sign In</Link>
                    }
                </span>

                <span className="flex space-x-2">
                    {
                        isLoggedIn&&(
                            <div className="flex gap-4 items-center justify-center text-white ">
                                <Link to='/my-bookings' className="hover:bg-white hover:text-blue-500 rounded-md sm:px-1">My Bookings</Link>
                                <Link to='/my-hotels' className="hover:bg-white hover:text-blue-500 rounded-md sm:px-1" >My Hotels</Link>
                            </div>
                        )
                    }
                </span>
            </div>
        </div>
    )
}
export default Header