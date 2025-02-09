import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Body = function(){
    return (
        <>
         <Navbar/>
         <Outlet/>
        </>
    )
}

export default Body;