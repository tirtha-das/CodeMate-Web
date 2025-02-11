import { createSlice } from "@reduxjs/toolkit";


const requestSlice = createSlice({
    name:"requests",
    initialState:[],
    reducers:{
        addRequests:function(state,action){
            return action.payload;
        },
        removeRequest:function(state,action){
           const requestsLeft = state.filter((user)=>{
            return (user._id!=action.payload);
           })
           return requestsLeft;
        }
    }
})

export const {addRequests,removeRequest} = requestSlice.actions;

export default requestSlice.reducer;