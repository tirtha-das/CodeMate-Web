import { useEffect } from "react";
import { BASE_URL } from "../utlis/constant";
import Navbar from "./Navbar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import axios from "axios"
import { useDispatch , useSelector } from "react-redux";
import { addUser } from "../utlis/userSlice";
import { createSocketConnection } from "../utlis/socket";


const Body = function(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const loggedInUser = useSelector((store)=>store.user);

    const isUserLoggedIn = async function(){
        try{
            if(location.pathname==="/error"){
               await axios.post(BASE_URL+"/logout",{},{withCredentials:true});
                navigate("/login");
                return;
            }
        const userData = await axios.get(BASE_URL+"/profile/view",{withCredentials:true})
        dispatch(addUser(userData?.data?.data));
       
        

        navigate(`${location.pathname}`);
        }catch(err){
            if(err.status===401){
            navigate("/login");
            }
            else{
                navigate("/error");
            }
        }
        
    }

    const handleLogout = async()=>{
      try{
        axios.post(BASE_URL+"/logout",{},{withCredentials:true});
      }catch(err){
        navigate("/error");
      }
    }

    useEffect(()=>{
        isUserLoggedIn();
    },[])

    // useEffect(()=>{
    //     window.addEventListener("beforeunload",(event)=>{
    //         handleLogout();
    //     })
        

    //     return ()=>{
    //       //socket.disconnect();
    //       window.removeEventListener("beforeunload",(event)=>{
    //         handleLogout();
    //       })
    //     }
    // },[])

    useEffect(()=>{
      //console.log(loggedInUser);
      
      if(!loggedInUser) return ;
      const socket = createSocketConnection();
        socket.emit("userOnline",{userId:loggedInUser._id});


        return ()=>{
          socket.disconnect();
        }

    },[loggedInUser])



    return (
        <>
         <Navbar/>
         <Outlet/>
        </>
    )
}

export default Body;