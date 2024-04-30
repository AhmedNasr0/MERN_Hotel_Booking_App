import { BrowserRouter as Router ,Route,Routes} from "react-router-dom"
import Layout from "./Layouts/Layout"
import RegisterPage from "./pages/registerPage"
import LoginPage from "./pages/loginPage"


function App() {

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
         </Routes>
      </Router>
    </>
  )
}

export default App
