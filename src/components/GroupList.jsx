import { Link, useNavigate } from "react-router-dom";
import {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { addGroupLists } from "../utlis/groupSlice";
import { BASE_URL } from "../utlis/constant";
import axios from "axios";

const GroupList  = ()=>{
   const [groupLists,setGroupLists] = useState([]);
   const navigate = useNavigate();
   const dispatch = useDispatch();


   const allGroups = useSelector(store=>store.GroupList);

   const loadGroupList = async()=>{
     if(allGroups && allGroups.length>0){
          setGroupLists(allGroups)
     }else{
      try{
        const response = await axios.get(BASE_URL+"/group/allGroups",{withCredentials:true})
        //console.log(response.data.data);
        
        dispatch(addGroupLists(response?.data?.data));
        setGroupLists(response?.data?.data);
      }catch(err){
         console.log(err);
         navigate("/error");
         
      }
     }
   }

   useState(()=>{
      loadGroupList();
   },[])
   
   
   return (
      <>
    <div className="flex justify-center">
    <div className="card card-dash bg-base-100 w-96">
     <div className="card-body">
        <div className="card-actions justify-center">
           <button className="btn btn-primary"><Link to="/createGroup">Create New Group</Link></button>
        </div>
       </div>
    </div>
    </div>
     <div className="Group-Container">
     <h1>Group List</h1>
     <div>{
        }</div>
   </div>
   </>
   )
}

export default GroupList;