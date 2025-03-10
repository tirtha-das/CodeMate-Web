import {io} from "socket.io-client";
import { BASE_URL} from "./constant";

export const createSocketConnection = function(){
    return io(BASE_URL,{
        auth:(cb)=>{
            cb({
               token:document.cookie.split("=")[1] 
            })
        }
    });
};