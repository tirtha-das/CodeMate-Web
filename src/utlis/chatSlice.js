import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name:"chat",
    initialState:{
       // newMessage:{},
        pastMessages:[]
    },
    reducers:{
        addPastMessages: function(state,action){
            state.pastMessages = action.payload;
        }
    }

})


export const {addPastMessages} = chatSlice.actions;

export default chatSlice.reducer;