import {useState} from "react";
import UserCard from "./UserCard";
import { BASE_URL } from "../utlis/constant";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { useDispatch } from "react-redux";
import { addUser } from "../utlis/userSlice";

const EditProfile = ({user})=>{
    const [firstName,setFirstName] = useState(user.firstName);
    const [lastName,setLastName] = useState(user.lastName);
    const [age,setAge] = useState(user.age||"");
    const [gender,setGender] = useState(user.gender||"");
    const [photoURL,setPhotoURL] = useState(user.photoURL);
    const [about,setAbout] = useState(user.about||"");
    const [errorMessage,setErrorMessage] = useState("");
    const [showToast,setShowToast] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const updatedUserInfo={
            firstName,
            lastName,
            age,
            gender,
            photoURL,
            about
           };


      const handleUpdate = async function(){
        try{
           const response = await axios.patch(BASE_URL+"/profile/update",{
            firstName,
            lastName,
            age,
            gender,
            photoURL,
            about
           },{withCredentials:true})

           dispatch(addUser(response?.data?.data));
           setShowToast(true);
           setTimeout(()=>{
            setShowToast(false);
            navigate("/");
           },1600)
           
        }catch(err){
           console.error(err);
           navigate("/error");
        }
      }
    
    
    return (
        <div className="flex w-screen my-10 mr-20 justify-center">
        <div className="flex justify-center mx-20">
        <div className="card bg-base-300 w-96 shadow-xl  rounded-lg">
          <div className="card-body">
            <div className="flex justify-center">
            <h2 className="card-title text-4xl text-center font-bold">
              Update Your Porfile
              </h2>
            </div>
            <label className="form-control w-full max-w-xs my-2">
               <div className="label">
                 <span className="label-text text-xl mb-1">First Name</span>
               </div>
                <input type="text"className="input input-bordered w-full max-w-xs"
                value={firstName} 
                onChange={(e)=>{
                    setFirstName(e.target.value)
                }}/>
             </label>
             <label className="form-control w-full max-w-xs my-2">
               <div className="label">
                 <span className="label-text text-xl mb-1">Last Name</span>
               </div>
                <input type="text"className="input input-bordered w-full max-w-xs"
                value={lastName} 
                onChange={(e)=>{
                    setLastName(e.target.value)
                }}/>
             </label>
            <label className="form-control w-full max-w-xs my-2">
               <div className="label">
                 <span className="label-text text-xl mb-1">Age</span>
               </div>
               <select className="select select-bordered w-full max-w-xs"
                value={age || ""} 
                onChange={(e)=>{
                    setAge(e.target.value)
                }}><option value="" disabled>Select your age</option>
                  {
                 [...Array(63)].map((value,idx)=>{
                  const curAge = idx+18;
                   return <option key={curAge} value={curAge}>{curAge}</option>
                 })
                }
                </select>
             </label>
             <label className="form-control w-full max-w-xs my-2">
               <div className="label">
                 <span className="label-text text-xl mb-1">Gender</span>
               </div>
               <select className="select select-bordered w-full max-w-xs"
                value={gender || ""} 
                onChange={(e)=>{
                    setGender(e.target.value)
                }}>
                  <option value="" disabled>Select your gender</option>
                   <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </label>
             <label className="form-control w-full max-w-xs my-2">
               <div className="label">
                 <span className="label-text text-xl mb-1">PhotoURL</span>
               </div>
                <input type="text"className="input input-bordered w-full max-w-xs"
                value={photoURL} 
                onChange={(e)=>{
                    setPhotoURL(e.target.value)
                }}/>
             </label>
             <label className="form-control w-full max-w-xs my-2">
               <div className="label">
                 <span className="label-text text-xl mb-1">About</span>
               </div>
               <textarea className="textarea textarea-bordered" value={about} 
                onChange={(e)=>{
                    setAbout(e.target.value)
                }}></textarea>
                
             </label>
             <p className="text-red-500 my-2 text-lg">{errorMessage}</p>
            <div className="card-actions justify-end mt-3">
              <button className="btn btn-primary" onClick={handleUpdate}>
              Update
              </button>
            </div>
          </div>
        </div>
        </div>
        
         <UserCard userInfo={updatedUserInfo}/>
        {showToast && <div className="toast toast-top toast-center">
  
           <div className="alert alert-success">
             <span>Profile update successful</span>
           </div>
         </div>}
        
         </div>
        
    )
}

export default EditProfile