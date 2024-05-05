import { BrowserRouter as Router ,Route,Routes} from "react-router-dom"
import Layout from "./Layouts/Layout"
import RegisterPage from "./pages/registerPage"
import LoginPage from "./pages/loginPage"
import { useAppContext } from "./context/appContext"
import AddHotel from "./pages/addHotelPage"
import MyHotelsPage from "./pages/myHotelsPage"
import EditHotelPage from "./pages/editHotelPage"


function App() {
  const {isLoggedIn}=useAppContext();
  return (
    <>
      <Router>
         <Routes>
            <Route path="/" element={
              <Layout child={
                <p>Home Page</p>
              }>
              </Layout>}
            />
            <Route path="/search" element={
              <Layout child={
                <p>search Page</p>
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
            {
              isLoggedIn&&(
                <>
                <Route path="/add-hotel" element={
                  <Layout child={
                    <AddHotel/>
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
