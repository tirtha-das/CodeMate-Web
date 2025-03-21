import { useSelector } from "react-redux";


const ChatMessage = ({messageInfo})=>{
  //console.log(messageInfo);

 
  
  const loggedInUser = useSelector((store)=>store.user)
  const {fromUserId,firstName,text} = messageInfo;
  //console.log(fromUserId+" "+firstName+" "+text);
  
  const isSenderMe = (loggedInUser?._id.toString()===fromUserId?.toString());
  //console.log(isSenderMe);
    
  
  return (
    <div className="mx-3 mt-1">
    <div className={"chat "+(!isSenderMe?"chat-start":"chat-end")}>
  <div className="chat-image avatar">
    <div className="w-10 rounded-full">
      <img
        alt="Tailwind CSS chat bubble component"
        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
    </div>
  </div>
  <div className="chat-header">
    {firstName}
    <time className="text-xs opacity-50">12:45</time>
  </div>
  <div className="chat-bubble">{text}</div>
  <div className="chat-footer opacity-50">Delivered</div>
</div>
</div>

  )
}

export default ChatMessage;