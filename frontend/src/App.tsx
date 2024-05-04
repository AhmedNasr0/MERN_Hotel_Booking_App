import { BrowserRouter as Router ,Route,Routes} from "react-router-dom"
import Layout from "./Layouts/Layout"
import RegisterPage from "./pages/registerPage"
import LoginPage from "./pages/loginPage"
import { useAppContext } from "./context/appContext"
import AddHotel from "./pages/addHotelPage"


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
                <Route path="/add-hotel" element={
                  <Layout child={
                    <AddHotel/>
                  }>
                  </Layout>}
                />
              )
            }
         </Routes>
      </Router>
    </>
  )
}

export default App
