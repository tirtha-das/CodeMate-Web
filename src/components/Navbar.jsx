import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import { BASE_URL } from "../utlis/constant";




const Navbar = function(){
   const navigate = useNavigate();

   const handleLogout = async function(){
    try{
      await axios.post(BASE_URL+"/logout",{},{withCredentials:true});
      navigate("/login");
    }catch(err){
      console.error(err.message);
      
      navigate("/error");
      
    }
     
   }

    return(
        <div className="navbar bg-base-300 mr-4">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl bg-base-100">CodeMate</Link>
        </div>
        <div className="flex-none gap-2">
         
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
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
        </div>
      </div>
    )
}

export default Navbar;