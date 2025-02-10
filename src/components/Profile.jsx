import { useSelector } from "react-redux";
import UserCard from "./UserCard";



const Profile = function(){
    const userInfo = useSelector(store=>store.user);

    return (
        <div className="flex justify-center">
         {userInfo && <UserCard userInfo={userInfo}/>}
         </div>
    )
}

export default Profile;