import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../utlis/constant";
import { useEffect, useState, useRef} from "react";
import ChatMessage from "./chatMessage";
import { createSocketConnection } from "../utlis/socket"
import { useDispatch, useSelector } from "react-redux";
import { addPastMessages } from "../utlis/chatSlice";


const ChatRoom = ()=>{
    const {toUserId} = useParams();
    const loggedInUser = useSelector((Store)=>Store.user);
    const loggedInUserId = loggedInUser?._id;
    const navigate = useNavigate();
    const [toUserFirstName,setToUserFirstName] = useState("");
    const [toUserlastName,setToUserLastName] = useState("");
    const [toUserphotoURL,setToUserPhotoURL] = useState("");
    const [blocked,setBlocked] = useState([]);
    const[messages,setMessages] = useState([]);
    const [newMessage,setNewMessage] = useState("");
    const [showBlockToast,setShowBlockToast] = useState(false);
    const [toastMessage,setToastMessage] = useState("");
    const [isToUserOnline,setIsToUserOnline] = useState(false);
     const socket = useRef(null);
    const disPatch = useDispatch();
    const pastMessages = useSelector((store)=>store.chat.pastMessages);
    const chatRef = useRef(null);

    const getUserData = async function(){
        try{
         // console.log(toUserId);
          
        const response = await axios.get(BASE_URL+"/user/details/"+toUserId,{withCredentials:true});
         //console.log(response?.data?.data[0]);
        if(response?.data?.data.length===0){
          navigate("/friends");
          return;
        }
        
        const {firstName,lastName,photoURL,blockedBy,isOnline} = response?.data?.data[0];
        setToUserFirstName(firstName);
        setToUserLastName(lastName);
        setToUserPhotoURL(photoURL);
        setBlocked(blockedBy);
        setIsToUserOnline(isOnline);
      }
        catch(err){
            console.log(err.message);
            navigate("/error");
        }
    }

    const getPreviousChat = async function(){
       const response = await axios.get(BASE_URL+"/chat/"+toUserId,{withCredentials:true});
       //console.log(response?.data?.data);
      //  if(!messages.length){
      //  setMessages((prevMessages)=>{
      //   const updatedMessage  =  [...prevMessages,...response?.data?.data]
      //   return updatedMessage;
      //  });
      // }
       disPatch(addPastMessages(response?.data?.data));
    };

    useEffect(()=>{
        getUserData();
    },[toUserId])

    useEffect(()=>{
      getPreviousChat();
    },[])

    useEffect(()=>{
      //console.log(loggedInUserId +" "+ toUserFirstName.length);
      
       if(!loggedInUserId || toUserFirstName.length===0) return;
          //console.log("hello");
          
        socket.current = createSocketConnection();
      socket.current.emit("joinChat",{userId:loggedInUserId,toUserId});
      socket.current.on("connect_error", ({err}) => {
       console.error(err.message); // not authorized
        //console.log(err.data); // { content: "Please retry later" }
      });
      socket.current.on("notFriend",({err})=>{
        navigate("/friends");
      })

      socket.current.on("updateUserStatus",({userId,onlineStatus})=>{
          console.log(userId +" "+onlineStatus);
         
        if(userId.toString()===toUserId.toString()){
          setIsToUserOnline(onlineStatus);
        } 
        //  console.log(onlineUsersTraker);
        //  console.log(typeof onlineUsersTraker);
        //  console.log(onlineUsersTraker instanceof Map);
         
        //  if(onlineUsersTraker.hasOwnProperty(toUserId.toString())){
        //   setIsToUserOnline(onlineStatus);
        //  }
         
      })

      socket.current.on("messageReceived",({fromUserId,firstName,text})=>{
       // console.log(firstName+" : "+text);
        //console.log("ato ta obhdhi kaj korche");
        //disPatch(addNewMessage({fromUserId,firstName,text}));

        // console.log("messageReceived :"+text);
        
        setMessages((prevMessages)=>{
        const updatedMessage  =  [...prevMessages,{fromUserId,firstName,text}]
        return updatedMessage;
       });
       // console.log(messages);
      
      })

      return ()=>{
        socket.current.disconnect();
      }
    },[loggedInUserId,toUserId,toUserFirstName]);

    useEffect(()=>{
       chatRef.current.scrollTo({
        top:chatRef.current.scrollHeight,
        behaviour:"smooth"
       })
    },[messages,pastMessages])

    //console.log(messages);
    

    const sendNewMessage = ()=>{
      if(!socket.current) {
        socket.current = createSocketConnection();
      }
      // console.log(newMessage);
      // console.log(blocked.length);
      // console.log(toUserFirstName);
      
      
      if(blocked.length!==0){
        //console.log("hello");
        
        setShowBlockToast(true);
        setNewMessage("");
        if(blocked.includes(loggedInUserId.toString())){
          setToastMessage(`You Have blocked ${toUserFirstName}`);
        }else{
          setToastMessage(`${toUserFirstName} Have blocked you`);
        }
         setTimeout(()=>{
          setToastMessage("");
          setShowBlockToast(false);
         },1700)
         return;
      }

      // console.log("hi");
      
     // const socket = createSocketConnection();
      socket.current.emit("sendMessage",{userId:loggedInUser._id,toUserId,firstName:loggedInUser.firstName,text:newMessage})
      setNewMessage("");
      // socket.disconnect();
    }
     
    //console.log(pastMessages);
    
    return (
        <div className="flex justify-center">
        <div className="card bg-base-200 w-96 shadow-xl rounded-2xl ">
          <div className="card-header flex bg-base-300 p-3 border border-amber-50">
            <img
             src={toUserphotoURL || "https://cdn-icons-png.flaticon.com/256/9572/9572778.png"} className="h-20 w-20 rounded-full mx-2"
             alt="User-Photo" />
             <h2 className="card-title">{toUserFirstName+" "+toUserlastName}</h2>
             {blocked?.length===0 && isToUserOnline && <h2>Online</h2> }
          </div>
          <div ref={chatRef} className="border border-amber-50 h-96 overflow overflow-y-scroll">
          { pastMessages?.length>0 && pastMessages.map((msg,idx)=>{
            //console.log(msg);
            
            return <ChatMessage key={idx} messageInfo={msg}/>
           })}
           {messages?.length>0 && messages.map((msg,idx)=>{
            // console.log(msg);
            
            return <ChatMessage key={idx} messageInfo={msg}/>
           })} 
          </div>
          <div className="border border-amber-50 h-20 flex items-center">
          <input
            type="text"
             placeholder="Type here"
            className="input input-bordered input-secondary mx-2 max-w-xs"
            value={newMessage} onChange={(event)=>
            {setNewMessage(event.target.value)}} />
            <button className="btn btn-accent mr-2"
            onClick={()=>{
              sendNewMessage();
            }}>Send</button>
          </div>
         </div>
         {showBlockToast && <div className="toast toast-top toast-center text-center">
  
           <div className="alert alert-error text-center">
              <span>{toastMessage}</span>
               </div>
               </div>}
         </div>
    );
}

export default ChatRoom;