import { Link } from "react-router-dom";


const GroupList  = ()=>{
   return (
    <div className="flex justify-center">
    <div className="card card-dash bg-base-100 w-96">
     <div className="card-body ">
        <div className="card-actions justify-center">
           <button className="btn btn-primary"><Link to="/createGroup">Create New Group</Link></button>
        </div>
       </div>
    </div>
    </div>
   )
}

export default GroupList;