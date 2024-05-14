import Header from "../Components/Header"
import Hero from "../Components/Hero"
import Footer from "../Components/footer"
import SearchBar from "../Components/searchBar"



interface IProps{
    child:React.ReactNode
    searchApperance?:boolean
}

const Layout=({child,searchApperance}:IProps)=>{
    
    return(
            <div className="flex flex-col min-h-screen">
                <Header/>
                <Hero/>
                { searchApperance&& (<div className="container xl:px-[10rem] px-4 mx-auto"> <SearchBar/></div>)}
                <div className="container px-4 xl:px-[10rem]  mx-auto py-10 flex-1">{child}</div>
                <Footer/>
            </div>
    )
}
export default Layout