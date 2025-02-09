import { useState } from "react";
import axios from "axios"
import { BASE_URL } from "../utlis/constant";
import { useNavigate } from "react-router-dom";

const Login = function(){

    const [emailId,setEmailId] = useState("");
    const [password,setPassword] = useState("");
    const [errorMessage,setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleLoggedIn = async()=>{
       try{ 
      const data = await axios.post(BASE_URL+"/login",{emailId,password},{withCredentials:true})
       console.log(data);
       navigate("/");
       }
       catch(err){
        console.log(err);
        
         setErrorMessage(err.response.data);
       }
    }


    return (
        <div className="flex justify-center">
        <div className="card bg-base-300 w-96 shadow-xl my-10 rounded-lg">
          <div className="card-body">
            <div className="flex justify-center">
            <h2 className="card-title text-4xl text-center font-bold">Login</h2>
            </div>
            <label className="form-control w-full max-w-xs my-2">
               <div className="label">
                 <span className="label-text text-xl mb-1">Email Id</span>
               </div>
                <input type="text"className="input input-bordered w-full max-w-xs"
                value={emailId} onChange={(e)=>{
                    setEmailId(e.target.value)
                }}/>
             </label>
             <label className="form-control w-full max-w-xs my-2">
               <div className="label">
                 <span className="label-text text-xl mb-1">Password</span>
               </div>
                <input type="password"className="input input-bordered w-full max-w-xs"
                value={password} onChange={(e)=>{
                    setPassword(e.target.value)
                }}/>
             </label>
             <p className="text-red-500 my-2 text-lg">{errorMessage}</p>
            <div className="card-actions justify-end mt-3">
              <button className="btn btn-primary" onClick={handleLoggedIn}>Submit</button>
            </div>
          </div>
        </div>
        </div>
    )
}

export default Login;