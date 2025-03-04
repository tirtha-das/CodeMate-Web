import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "./userSlice"
import feedSliceReducer from "./feedSlice";
import connectionSliceReducer from "./connectionSlice";
import requestSliceReducer from "./requestSlice";
import chatSliceReducer from "./chatSlice";



const appStore = configureStore({
    reducer:{
       user:userSliceReducer,
       feed:feedSliceReducer,
       connections:connectionSliceReducer,
       requests:requestSliceReducer,
       chat:chatSliceReducer
    }
});

export default appStore;