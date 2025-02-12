import { useSelector } from "react-redux";

import EditProfile from "./EditProfile";



const Profile = function(){
    const userInfo = useSelector(store=>store.user);
    //console.log(userInfo);
    
    
   return (!userInfo)?<div>loading</div>:
      <div>
        <EditProfile user={userInfo}/>
      </div>
}

export default Profile;