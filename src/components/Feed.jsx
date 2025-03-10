import axios from "axios"
import { useEffect } from "react";
import { BASE_URL } from "../utlis/constant";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utlis/feedSlice";
import UserCard from "./UserCard";

const Feed = function(){

    const dispatch = useDispatch();
     const feedData = useSelector((store)=>store.feed);

     
     //console.log(feedData);
     
    const getFeedData = async function(){
        //console.log(BASE_URL);

        // const token = document.cookie.split("=");
        // console.log(token[0]+" : "+token[1]);
        
        
        const feedData = await axios.get(BASE_URL+"/user/feed",{withCredentials:true});
       // console.log(feedData?.data?.data);
        dispatch(addFeed(feedData?.data?.data));
    }

    useEffect(()=>{
        getFeedData();
    },[])

  

    return (
        <div className="flex justify-center mt-10 rounded-3xl">
        { (feedData.length === 0)?<h1>Feed is Empty</h1>
          :<UserCard userInfo={feedData[0]}/>}
      </div> 
    )
}

export default Feed;