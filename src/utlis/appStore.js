import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "./userSlice"
import feedSliceReducer from "./feedSlice";



const appStore = configureStore({
    reducer:{
       user:userSliceReducer,
       feed:feedSliceReducer
    }
});

export default appStore;