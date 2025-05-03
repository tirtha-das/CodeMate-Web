import { useEffect, useState } from "react";
import { useDispatch,useSelector} from "react-redux";
import ProfileCard,{ WrappedGroupMemberProfile } from "./ProfileCard";
import axios from "axios";
import { BASE_URL } from "../utlis/constant";
import { addConnections } from "../utlis/connectionSlice";

const CreateGroup = ()=>{
    const [friendList,setFriendList] = useState([]);
    const dispatch = useDispatch();
    const allFriends = useSelector((store)=> store.connections); 
    const [mySet,setMySet] = useState(new Set());
    const [showSelectedCard,setShowSelectedCard] = useState(false);

   //console.log(allFriends.length);
   
    const handleFriends = async()=>{
       const response  = await axios.get(BASE_URL+"/user/connections",{withCredentials:true});
        dispatch(addConnections(response?.data?.data));
        setFriendList(response?.data?.data);
    }

    useEffect(()=>{
        if(allFriends.length){
            setFriendList(allFriends);
        }
        else{
            handleFriends();
        }
      
    // setFriendList(allFriends);
    },[mySet])

    const handleInsert = (value)=>{
       setMySet((prevState)=>{
         const newSet = new Set(prevState);
         newSet.add(value);
         return newSet;
       })
    }

    const handleRemove = (value)=>{
        setMySet((prevState)=>{
            const newSet = new Set(prevState);
            if(newSet.has(value)){
              newSet.delete(value);
            }
            return newSet;
        })
    }
    
    //console.log(friendList);
    const NotSelectedFriendCard = WrappedGroupMemberProfile(ProfileCard);

    
    return (
        <>
        <div className="flex">
          <div className="flex flex-col items-center">{
            friendList.map((user)=>{
                if(!mySet.has(user._id)) {
                    return <NotSelectedFriendCard key={user._id} toUserInfo={user} handleInsert={handleInsert}selectedCard={false}/>
                }
            })
           }
          </div>

          {showSelectedCard &&<div className="flex flex-col items-center">{
            friendList.map((user)=>{
                    if(mySet.has(user._id)){
                    return <NotSelectedFriendCard key={user._id} toUserInfo={user} handleRemove={handleRemove}
                    selectedCard={true}/>
                }
            })
           }
          </div>}
        </div>
        <div className="flex">
          
           <button className="btn btn-secondary">Create Group</button>
           
           <button className="btn btn-info" onClick={()=>{
             setShowSelectedCard((prevState)=>{
                return !prevState;
             })
           }}>View Group Members</button>
           
        </div>
        </>


    )
}


export default CreateGroup;