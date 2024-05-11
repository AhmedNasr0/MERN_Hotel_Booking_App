import Header from "../Components/Header"
import Hero from "../Components/Hero"
import Footer from "../Components/footer"
import SearchBar from "../Components/searchBar"



interface IProps{
    child:React.ReactNode
}

const Layout=({child}:IProps)=>{

    return(
            <div className="flex flex-col min-h-screen">
                <Header/>
                <Hero/>
                <div className="container max-auto"> <SearchBar/></div>
                <div className="container mx-auto py-10 flex-1">{child}</div>
                <Footer/>
            </div>
    )
}
export default Layout