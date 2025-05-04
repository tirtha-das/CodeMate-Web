import { useEffect, useState } from "react";
import { useDispatch,useSelector} from "react-redux";
import ProfileCard,{ WrappedGroupMemberProfile } from "./ProfileCard";
import axios from "axios";
import { BASE_URL } from "../utlis/constant";
import { addConnections } from "../utlis/connectionSlice";
import { useNavigate } from "react-router-dom";

const CreateGroup = ()=>{
    const [friendList,setFriendList] = useState([]);
    const dispatch = useDispatch();
    const allFriends = useSelector((store)=> store.connections); 
    const [mySet,setMySet] = useState(new Set());
    const [showSelectedCard,setShowSelectedCard] = useState(false);
    const [showSaveGroupButton,setShowSaveGroupButton] = useState(false);
    const [groupName,setGroupName] = useState("");
    const [showErrorToast,setShowErrorToast] = useState(false);
    const [showSuccessToast,setShowSuccessToast] = useState(false);
    const [errorToastMessage,setErrorToastMessage] = useState("");
    const navigate = useNavigate();

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
         {!showSaveGroupButton && <div className="flex flex-col items-center">{
            friendList.map((user)=>{
                if(!mySet.has(user._id)) {
                    return <NotSelectedFriendCard key={user._id} toUserInfo={user} handleInsert={handleInsert}selectedCard={false}/>
                }
            })
           }
          </div>}

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
          
           {!showSaveGroupButton && <button className="btn btn-secondary"
             onClick={()=>{
                setShowSaveGroupButton(true);
                setShowSelectedCard(true);
             }}>
            Create Group</button>}
           {showSaveGroupButton && <>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Enter Group Name</legend>
              <input type="text" className="input" placeholder="Type here" value={groupName} onChange={(e)=>{
                setGroupName(e.target.value);
              }}/>
             
            </fieldset>
            <button className="btn btn-secondary"
             onClick={()=>{
                setShowSaveGroupButton(false);
                setShowSelectedCard(false);
                setGroupName("");
             }}>Back</button>
            <button className="btn btn-secondary"
              onClick={async()=>{
                if(groupName.length===0){
                   setErrorToastMessage("Please Enter a valid Group Name");
                   setShowErrorToast(true);
                   setTimeout(()=>{
                    setErrorToastMessage("");
                    setShowErrorToast(false);
                   },1300)
                   return;
                }
                else if(mySet.size<1){
                    setErrorToastMessage("Group must have atleast one member");
                   setShowErrorToast(true);
                   setTimeout(()=>{
                    setErrorToastMessage("");
                    setShowErrorToast(false);
                   },1300)
                   return;
                }
                try{
                const response = await axios.post(BASE_URL+"/group/createGroup",{
                    groupName:groupName,
                    groupMembers : [...mySet]
                },{withCredentials:true})
                setShowSuccessToast(true);
                setTimeout(()=>{
                  setShowSuccessToast(false);
                  navigate("/groupList");
                },1200)

               }
               catch(err){
                   console.log(err);
                   
                  navigate("/error")
               }



              }}>
                Save</button>
            </>
            }
           
           {!showSelectedCard && <button className="btn btn-info" onClick={()=>{
             setShowSelectedCard((prevState)=>{
                return !prevState;
             })
           }}>{showSelectedCard?"Hide ":"View "} Selected Group Members</button>}
           
        </div>
        <div className="toast toast-top toast-center">
           {showErrorToast && <div className="alert alert-error">
             <span>{errorToastMessage}</span>
           </div>}
           {showSuccessToast && <div className="alert alert-success">
             <span>Group is successfully created</span>
           </div>}
         </div>
        </>


    )
}


export default CreateGroup;