import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name:"chat",
    initialState:{
        newMessage:{},
        prevMessages:[]
    },
    reducers:{
        addNewMessage: function(state,action){
            state.newMessage = action.payload;
        }
    }

})


export const {addNewMessage} = chatSlice.actions;

export default chatSlice.reducer;