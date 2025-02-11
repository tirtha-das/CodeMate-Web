import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utlis/constant";
import ProfileCard, { usingFriendTag } from "./ProfileCard";
import axios from "axios"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {addConnections} from "../utlis/connectionSlice"



const Friends = function(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const friendLists = useSelector(store=>store.connections);
    const FriendProfileCard = usingFriendTag(ProfileCard);

    const getFriendList = async function(){
        try{
            const response = await axios.get(BASE_URL+"/user/connections",{withCredentials:true});
           // console.log(response?.data?.data);

            dispatch(addConnections(response?.data?.data));
        }catch(err){
            console.error(err.message);
            navigate("/error");
            
        }
    }

   useEffect(()=>{
     getFriendList();
   },[])

    return (
    <div className="flex flex-col items-center">
       {friendLists.length && friendLists.map((friend)=>{
        return <FriendProfileCard key={friend._id} userInfo={friend}/>
       })}
    </div>
    )
}

export default Friends;