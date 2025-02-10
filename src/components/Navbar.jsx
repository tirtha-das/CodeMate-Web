import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import { BASE_URL } from "../utlis/constant";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utlis/userSlice";




const Navbar = function(){
   const navigate = useNavigate();
   const user = useSelector((store)=>store.user);
   const dispatch = useDispatch();
   //console.log(user);
   

   const handleLogout = async function(){
    try{
      await axios.post(BASE_URL+"/logout",{},{withCredentials:true});
      dispatch(removeUser());
      navigate("/login");
    }catch(err){
      console.error(err.message);
      
      navigate("/error");
      
    }
     
   }  

    //if(!user) return 

    return(
        <div className="navbar bg-base-300 mr-4">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl bg-base-100">CodeMate</Link>
        </div>
        {user && <div className="flex-none gap-2 flex justify-between items-center">
        <h1>{`Welcome ${user.firstName}`}</h1>
          <div className="dropdown dropdown-end">
          
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={user.photoURL} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/pendingRequest">Pending Requests</Link></li>
              <li><Link to="/friends">Friends</Link></li>
              <li><a onClick={handleLogout}>Logout</a></li>
            </ul>
          </div>
        </div>}
      </div>
    )
}

export default Navbar;