import { useState } from "react";
import axios from "axios"
import { BASE_URL } from "../utlis/constant";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utlis/userSlice";

const Login = function(){

    const [emailId,setEmailId] = useState("anwita123@gmail.com");
    const [password,setPassword] = useState("Anwita@123");
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [showSignUpForm,setShowSignUpForm] = useState(false);
    const [errorMessage,setErrorMessage] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLoggedIn = async()=>{
       try{ 
      const userData = await axios.post(BASE_URL+"/login",{emailId,password},{withCredentials:true})
       //console.log(userData?.data?.data);
       dispatch(addUser(userData?.data?.data));
       navigate("/");
       }
       catch(err){
        //console.log(err);
        
         setErrorMessage(err?.response?.data?.data[0]);
       }
    }

    const handleSignUp = async()=>{
      try{ 
     const userData = await axios.post(BASE_URL+"/signup",{firstName,lastName,emailId,password},{withCredentials:true})
      //console.log(userData?.data?.data);
      dispatch(addUser(userData?.data?.data));
      navigate("/profile");
      }
      catch(err){
       //console.log(err);
       
        setErrorMessage(err?.response?.data?.data[0]);
      }
   }


    return (
        <div className="flex justify-center">
        <div className="card bg-base-300 w-96 shadow-xl my-10 rounded-lg">
          <div className="card-body">
            <div className="flex justify-center">
            <h2 className="card-title text-4xl text-center font-bold">
              {showSignUpForm?"Sign Up":"Login"}
              </h2>
            </div>{showSignUpForm && <>
            <label className="form-control w-full max-w-xs my-2">
               <div className="label">
                 <span className="label-text text-xl mb-1">First Name</span>
               </div>
                <input type="text"className="input input-bordered w-full max-w-xs"
                value={firstName} onChange={(e)=>{
                    setFirstName(e.target.value)
                }}/>
             </label>
             <label className="form-control w-full max-w-xs my-2">
               <div className="label">
                 <span className="label-text text-xl mb-1">Last Name</span>
               </div>
                <input type="text"className="input input-bordered w-full max-w-xs"
                value={lastName} onChange={(e)=>{
                    setLastName(e.target.value)
                }}/>
             </label>
             </>}
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
              <button className="btn btn-primary" onClick={()=>{
                
                if(!showSignUpForm){
                  handleLoggedIn();
                }else{
                  handleSignUp();
                }
              }}>
              {showSignUpForm?"Sign Up":"Login"}
              </button>
            </div>

            <p className="text-xl cursor-pointer" onClick={
              ()=>{
                setErrorMessage("");
                setEmailId("");
                setFirstName("");
                setLastName("");
                setPassword("");
                setShowSignUpForm(!showSignUpForm)
              }}>{
              showSignUpForm?"Existing user? click here to login":"New User? click here to sign up"
              }</p>
          </div>
        </div>
        </div>
    )
}

export default Login;