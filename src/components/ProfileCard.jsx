import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utlis/constant";
import { useState,useRef } from "react";



const ProfileCard = function({toUserInfo}){

   const {firstName,lastName,photoURL,age,gender} = toUserInfo;

   

    return(
        <div className="card card-side shadow-xl flex items-center justify-between">
       <figure>
         <img className="rounded-full m-2 w-20 h-20"
      src={photoURL}
      alt="Movie" />
       </figure>
       <div className="card-body">
         <h2 className="card-title font-bold text-2xl">{firstName+" "+lastName}</h2>
         {age && gender && <p className="text-xl">{age+","+gender}</p>}
         </div>
      </div>
    )
}


export const WrappedPendingProfile = (ProfileCard) => {
  return (props) => {
    const { toUserInfo, handleReviewRequest } = props;

    return (
      <div className="flex w-1/2 items-center bg-base-300 rounded-2xl justify-around my-3">
        <ProfileCard {...props} />
        <div className="card-actions mx-3">
          <button
            className="btn btn-secondary text-xl font-bold"
            onClick={() => {
              handleReviewRequest(toUserInfo._id, "accepted");
            }}
          >
            Accept
          </button>
          <button
            className="btn btn-primary text-xl font-bold"
            onClick={() => {
              handleReviewRequest(toUserInfo._id, "rejected");
            }}
          >
            Reject
          </button>
        </div>
      </div>
    );
  };

};




export const WrappedFriendProfile=(ProfileCard)=>{
 return (props)=>{
   const {toUserInfo,goToChatRoom,loggedInUser} = props;
   const [isButtonDisable,SetIsButtonDisable] = useState(false) 
  //const lastTimeClicked = useRef(Date.now());

   //console.log(toUserInfo);
    //console.log( loggedInUser);
    const [isBlocked,SetIsBlocked] = useState((toUserInfo.blockedBy.includes(loggedInUser._id)));
    
   
   const navigate = useNavigate();
   //const [status,setStatus] = useState("Block")

   const handelProfileReviewRequest = async(status)=>{
    //const now = Date.now();

    if(isButtonDisable) return;
    //lastTimeClicked.current  = now;
      try{
         await axios.patch(BASE_URL+"/request/profilereview/"+status+"/"+toUserInfo._id,{},{withCredentials:true});
         SetIsBlocked( (prev)=>!prev);
         
         setTimeout(()=>{
          SetIsButtonDisable((prev)=>!prev);
         },2000)
         
      }catch(err){
        console.error(err.message);
        navigate("/error");
      }
   }
    //console.log(userInfo);
    
    return (
      <div className="flex w-1/2 items-center bg-base-300 rounded-2xl justify-around my-3">
        <ProfileCard {...props}/>
        <div className="card-actions mx-3">
           <button className="btn btn-secondary text-xl font-bold"
            onClick={()=>{
              goToChatRoom(toUserInfo._id);
            }}>Chat</button>
           <button className="btn btn-primary text-xl font-bold"
             onClick={()=>{
                (!isBlocked)?handelProfileReviewRequest("blocked"):handelProfileReviewRequest("unblocked");
             }}
             disabled={isButtonDisable}
           >{!isBlocked?"Block":"Unblock"}</button>
         </div>
      </div>
    )
  }
  
}






export default ProfileCard;


