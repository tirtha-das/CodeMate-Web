import {useState} from "react";
import UserCard from "./UserCard";

const EditProfile = ({user})=>{
    const [firstName,setFirstName] = useState(user.firstName);
    const [lastName,setLastName] = useState(user.lastName);
    const [age,setAge] = useState(user.age||"");
    const [gender,setGender] = useState(user.gender||"");
    const [photoURL,setPhotoURL] = useState(user.photoURL);
    const [about,setAbout] = useState(user.about||"");
    const [errorMessage,setErrorMessage] = useState("");
    const updatedUserInfo={
            firstName,
            lastName,
            age,
            gender,
            photoURL,
            about
           };
    
    
    return (
        <div>
        <div className="flex justify-center my-10 mr-20">
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
                <input type="text"className="input input-bordered w-full max-w-xs"
                value={age}
                 onChange={(e)=>{
                   setAge(e.target.value)
                }}/>
             </label>
             <label className="form-control w-full max-w-xs my-2">
               <div className="label">
                 <span className="label-text text-xl mb-1">Gender</span>
               </div>
                <input type="text"className="input input-bordered w-full max-w-xs"
                value={gender} 
                onChange={(e)=>{
                    setGender(e.target.value)
                }}/>
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
                <input type="text"className="input input-bordered w-full max-w-xs"
                value={about} 
                onChange={(e)=>{
                    setAbout(e.target.value)
                }}/>
             </label>
             <p className="text-red-500 my-2 text-lg">{errorMessage}</p>
            <div className="card-actions justify-end mt-3">
              <button className="btn btn-primary">
              Update
              </button>
            </div>
          </div>
        </div>
        </div>
        <div>
         <UserCard userInfo={updatedUserInfo}/>
         </div>
         </div>
        
    )
}

export default EditProfile