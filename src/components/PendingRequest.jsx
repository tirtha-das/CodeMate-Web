import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utlis/constant";
import ProfileCard,{ WrappedPendingProfile } from "./ProfileCard";
import axios from "axios"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {addRequests} from "../utlis/requestSlice"
import { removeRequest } from "../utlis/requestSlice";



const  PendingRequest = function(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const pendingRequestLists = useSelector(store=>store.requests);
    const PendingProfileCard =  WrappedPendingProfile(ProfileCard);


    const handleReviewRequest = async function(id,status){
        try{
          const response = await axios.patch(BASE_URL+"/request/review/"+status+"/"+id,{},{withCredentials:true});
  
          dispatch(removeRequest(id));
  
        }catch(err){
          console.error(err);
          navigate("/error");
          
        }
       }
  
  
  

    const getPendingRequestList = async function(){
        try{
            const response = await axios.get(BASE_URL+"/user/request/received",{withCredentials:true});
           // console.log(response?.data?.data);

            dispatch(addRequests(response?.data?.data));
        }catch(err){
            //console.error(err.message);
            navigate("/error");
            
        }
    }

   useEffect(()=>{
    getPendingRequestList();
   },[])
    
   if(pendingRequestLists.length===0) return;

    return (
    <div className="flex flex-col items-center">
       {pendingRequestLists.length && pendingRequestLists.map((user)=>{
        return <PendingProfileCard key={user._id} userInfo={user} handleReviewRequest={handleReviewRequest} />
       })}
    </div>
    )
}



export default PendingRequest;