import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProfileCard,{ WrappedGroupMemberProfile } from "./ProfileCard";

const CreateGroup = ()=>{
    const [friendList,setFriendList] = useState([]);
    const allFriends = useSelector((store)=> store.connections); 

    useEffect(()=>{
     setFriendList(allFriends);
    },[])
    
    console.log(friendList);
    const NotSelectedFriendCard = WrappedGroupMemberProfile(ProfileCard);

    
    return (
        <div className="flex flex-col items-center">{
            friendList.map((user)=>{
                return <NotSelectedFriendCard key={user._id} toUserInfo={user}/>
            })
        }
        </div>
    )
}


export default CreateGroup;