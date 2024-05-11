import { BrowserRouter as Router ,Route,Routes} from "react-router-dom"
import Layout from "./Layouts/Layout"
import RegisterPage from "./pages/registerPage"
import LoginPage from "./pages/loginPage"
import { useAppContext } from "./context/appContext"
import AddHotel from "./pages/addHotelPage"
import MyHotelsPage from "./pages/myHotelsPage"
import EditHotelPage from "./pages/editHotelPage"
import SearchPage from "./pages/SearchPage"
import HomePage from "./pages/HomePage"
import Detail from "./pages/DetailsPage"
import Booking from "./pages/Booking"
import MyBookingPage from "./pages/myBookingsPage"


function App() {
  const {isLoggedIn}=useAppContext();
  return (
    <>
      <Router>
         <Routes>
            <Route path="/" element={
              <Layout child={
                <HomePage/>
              }>
              </Layout>}
            />
            <Route path="/register" element={
              <Layout child={
                <RegisterPage/>
              }>
              </Layout>}
            />
            <Route path="/login" element={
              <Layout child={
                <LoginPage/>
              }>
              </Layout>}
            />
            <Route path="/search" element={
                  <Layout child={
                    <SearchPage/>
                  }>
                  </Layout>}
            />
            <Route
                path="/detail/:hotelId"
                element={
                  <Layout child={
                    <Detail />
                  }>
                  </Layout>
            }
          />
            {
              isLoggedIn&&(
                <>
                <Route path="/add-hotel" element={
                  <Layout child={
                    <AddHotel/>
                  }>
                  </Layout>}
                /> 
                <Route path="/my-bookings" element={
                  <Layout child={
                    <MyBookingPage/>
                  }>
                  </Layout>}
                /> 
                <Route path="/hotel/:hotelId/booking" element={
                  <Layout child={
                    <Booking/>
                  }>
                  </Layout>}
                /> 
                <Route path="/my-hotels" element={
                  <Layout child={
                    <MyHotelsPage/>
                  }>
                  </Layout>}
                />
                <Route path="/edit-hotel/:hotelId" element={
                  <Layout child={
                    <EditHotelPage/>
                  }>
                  </Layout>}
                />
                </>
                )
              }
         </Routes>
      </Router>
    </>
  )
}

export default App
