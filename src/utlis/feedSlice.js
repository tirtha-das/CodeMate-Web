import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name:"feed",
    initialState:[],
    reducers:{
        addFeed:function(state,action){
          return action.payload;
        },
        removeFeed:function(state,action){
          return [];
        },
        removeUserFromFeed:function(state,action){
            const id = action.payload;
            const userLeft = state.filter(user=>{
                return (user._id.toString()!==id.toString());
            })
            return userLeft;
        }
    }
})


export const {addFeed,removeFeed,removeUserFromFeed} = feedSlice.actions;

export default feedSlice.reducer;