


const ProfileCard = function({userInfo}){

   const {firstName,lastName,photoURL,age,gender} = userInfo;

   

    return(
        <div className="card card-side shadow-xl flex items-center justify-between">
       <figure>
         <img className="rounded-full m-2 w-20 h-20"
      src={photoURL}
      alt="Movie" />
       </figure>
       <div className="card-body">
         <h2 className="card-title font-bold text-2xl">{firstName+" "+lastName}</h2>
         {age && gender && <p className="text-xl">{age+","+gender}</p>}
         </div>
      </div>
    )
}


export const WrappedPendingProfile = (ProfileCard) => {
  return (props) => {
    const { userInfo, handleReviewRequest } = props;

    return (
      <div className="flex w-1/2 items-center bg-base-300 rounded-2xl justify-around my-3">
        <ProfileCard {...props} />
        <div className="card-actions mx-3">
          <button
            className="btn btn-secondary text-xl font-bold"
            onClick={() => {
              handleReviewRequest(userInfo._id, "accepted");
            }}
          >
            Accept
          </button>
          <button
            className="btn btn-primary text-xl font-bold"
            onClick={() => {
              handleReviewRequest(userInfo._id, "rejected");
            }}
          >
            Reject
          </button>
        </div>
      </div>
    );
  };

};




export const WrappedFriendProfile=(ProfileCard)=>{
 return (props)=>{
   const {userInfo,goToChatRoom} = props;
    //console.log(userInfo);
    
    return (
      <div className="flex w-1/2 items-center bg-base-300 rounded-2xl justify-around my-3">
        <ProfileCard {...props}/>
        <div className="card-actions mx-3">
           <button className="btn btn-secondary text-xl font-bold"
            onClick={()=>{
              goToChatRoom(userInfo._id);
            }}>Chat</button>
           <button className="btn btn-primary text-xl font-bold">Block</button>
         </div>
      </div>
    )
  }
  
}






export default ProfileCard;


