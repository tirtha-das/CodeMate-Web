import { useNavigate } from "react-router-dom";
import axios from "axios"
import { BASE_URL } from "../utlis/constant";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utlis/feedSlice";


const UserCard = function({userInfo}){
  // console.log("Hello");
  // console.log(userInfo);
  
  
   const {firstName,lastName,age,gender,about,photoURL,_id} = userInfo;
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const handleInvitation = async function(status){
     try{
        const response = await axios.post(BASE_URL+"/request/send/"+status+"/"+_id,{},{withCredentials:true});
        console.log(response);
        dispatch(removeUserFromFeed(_id));
        
     }catch(err){
        console.error(err.message);
        navigate("/error");
        
     }
   }



    return (
      <div className={"card bg-base-300 w-1/3 shadow-xl rounder-lg my-10"}>
  <figure className="mt-2">
    <img
      src={photoURL}
      alt="user-photo" />
  </figure>
  <div className="card-body items-center break-words overflow-hidden">
    <h2 className="card-title break-words overflow-hidden">{firstName+" "+lastName}</h2>
    <p>
      {age && <span>{age+","}</span>}
      {gender && <span>{gender}</span>}
    </p>
    <p className="break-words overflow-hidden">{about}</p>
    {_id &&<div className="card-actions mt-3">
          <button className="btn btn-primary text-2xl px-3 py-2 mx-3 rounded-lg"
           onClick={()=>{handleInvitation("ignored")}}>Ignore</button>
            <button className="btn btn-secondary text-2xl px-3 py-2 mx-3 rounded-lg" onClick={()=>{handleInvitation("interested")}}>Invite</button>
        </div>}
  </div>
</div>
    )
}

export default UserCard;