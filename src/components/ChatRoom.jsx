import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../utlis/constant";
import { useEffect, useState } from "react";
import ChatMessage from "./chatMessage";


const ChatRoom = ()=>{
    const {toUserId} = useParams();
    const navigate = useNavigate();
    const [userFirstName,setUserFirstName] = useState("");
    const [userlastName,setUserLastName] = useState("");
    const [userphotoURL,setUserPhotoURL] = useState("");
    
    const getUserData = async function(){
        try{
        const response = await axios.get(BASE_URL+"/user/details/"+toUserId,{withCredentials:true});
        const {firstName,lastName,photoURL} = response?.data?.data[0];
        setUserFirstName(firstName);
        setUserLastName(lastName);
        setUserPhotoURL(photoURL);
        
        }
        catch(err){
            console.log(err.message);
            navigate("/error");
        }
    }

    useEffect(()=>{
        getUserData();
    },[])
     
    
    return (
        <div className="flex justify-center">
        <div className="card bg-base-200 w-96 shadow-xl rounded-2xl ">
          <div className="card-header flex bg-base-300 p-3 border border-amber-50">
            <img
             src={userphotoURL || "https://cdn-icons-png.flaticon.com/256/9572/9572778.png"} className="h-20 w-20 rounded-full mx-2"
             alt="User-Photo" />
             <h2 className="card-title">{userFirstName+" "+userlastName}</h2>
           
          </div>
          <div className="border border-amber-50 h-96">
            <ChatMessage/>
          </div>
          <div className="border border-amber-50 h-20 flex items-center">
          <input
            type="text"
             placeholder="Type here"
            className="input input-bordered input-secondary mx-2 max-w-xs" />
            <button className="btn btn-accent mr-2">Send</button>
          </div>
         </div>
         </div>
    );
}

export default ChatRoom;