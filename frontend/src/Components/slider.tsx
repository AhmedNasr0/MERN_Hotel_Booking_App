import { useEffect, useState } from "react"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"

const Slider=({images}:{images:any[]})=>{
    const[current,setCurrent]=useState(0);

    const prev=()=>setCurrent((curr)=>(curr===0)?images.length-1:curr - 1)
    const next=()=>setCurrent((curr)=>(curr===images.length-1)? 0 :curr + 1)
    
    useEffect(()=>{
        const slide=setInterval(next,3000)
        return ()=> clearInterval(slide);
    },[])

    return(
        <div className="overflow-hidden w-full relative">
            <div className="flex object-cover w-full h-full transition-transform ease-out duration-500" style={{transform:`translateX(-${current*100}%)`}}>
                {
                    images.map((img: string | undefined)=> (
                        <img  className="w-full h-full object-cover"  src={img} />
                    ))
                }
            </div>
            <div className=" absolute inset-0 flex items-center justify-between p-4">
                <button onClick={prev} className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white">
                    <IoIosArrowBack  size={40} />
                </button>
                <button onClick={next} className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white">
                    <IoIosArrowForward size={40}/>
                </button>
            </div>
            <div className="absolute bottom-4 right-0 left-0">
                <div className="flex items-center justify-center gap-2">
                    {
                        images.map((_: any,i: number)=>(
                            <div className={` transition-All w-3 h-3 bg-white rounded-full ${current===i ? "p-2" : "bg-opacity-50"}`}>
                                
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
export default Slider 