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
    const[messages,setMessages] = useState([]);
    const [newMessage,setNewMessage] = useState("");
     const socket = useRef(null);
    const disPatch = useDispatch();
    const pastMessages = useSelector((store)=>store.chat.pastMessages);
    const chatRef = useRef(null);

    const getUserData = async function(){
        try{
        const response = await axios.get(BASE_URL+"/user/details/"+toUserId,{withCredentials:true});
        const {firstName,lastName,photoURL} = response?.data?.data[0];
        setToUserFirstName(firstName);
        setToUserLastName(lastName);
        setToUserPhotoURL(photoURL);
        
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
    },[])

    useEffect(()=>{
      getPreviousChat();
    },[])

    useEffect(()=>{
       if(!loggedInUserId) return;

        socket.current = createSocketConnection();
      socket.current.emit("joinChat",{userId:loggedInUserId,toUserId});

      socket.current.on("messageReceived",({fromUserId,firstName,text})=>{
       // console.log(firstName+" : "+text);
        //console.log("ato ta obhdhi kaj korche");
        //disPatch(addNewMessage({fromUserId,firstName,text}));

        
        setMessages((prevMessages)=>{
        const updatedMessage  =  [...prevMessages,{fromUserId,firstName,text}]
        return updatedMessage;
       });
       // console.log(messages);
      
      })

      return ()=>{
        socket.current.disconnect();
      }
    },[loggedInUserId,toUserId]);

    useEffect(()=>{
       chatRef.current.scrollTo({
        top:chatRef.current.scrollHeight,
        behaviour:"smooth"
       })
    },[messages,pastMessages])

    //console.log(messages);
    

    const sendNewMessage = ()=>{
      if(!socket.current) return ;

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
         </div>
    );
}

export default ChatRoom;