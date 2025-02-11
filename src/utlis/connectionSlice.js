import { createSlice } from "@reduxjs/toolkit";


const connectionSlice = createSlice({
    name:"connections",
    initialState:[],
    reducers:{
        addConnections:function(state,action){
            return action.payload;
        }
    }
})

export const {addConnections} = connectionSlice.actions;

export default connectionSlice.reducer;