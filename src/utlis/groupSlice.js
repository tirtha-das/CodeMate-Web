import { createSlice } from "@reduxjs/toolkit";

const groupSlice = createSlice({
    name:"groupLists",
    initialState:[],
    reducers:{
        addGroupLists:(state,action)=>{
           return action.payload;
        }
    }
});


export const {addGroupLists} = groupSlice.actions;

export default groupSlice.reducer;