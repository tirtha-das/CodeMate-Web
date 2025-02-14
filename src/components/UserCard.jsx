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
        dispatch(removeUserFromFeed(_id));
        
     }catch(err){
        console.error(err.message);
        navigate("/error");
        
     }
   }



    return (
      <div className={"card bg-base-300 w-1/4 shadow-xl rounded-lg self-start h-auto items-center"}>
  <figure className="rounded-2xl">
    <img className="rounded-2xl w-full"
      src={photoURL}
      alt="user-photo" />
  </figure>
  <div className="card-body break-words whitespace-normal w-full max-w-xs">
    <h2 className="card-title break-all whitespace-normal w-full max-w-xs">{firstName+" "+lastName}</h2>
    <p>
      {age && <span>{age+","}</span>}
      {gender && !(gender.toString()==="Select your gender") && <span className="text-capitalize">{gender}</span>}
    </p>
    <p className="break-words whitespace-normal w-full">{about}</p>
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