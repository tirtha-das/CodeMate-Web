import { BrowserRouter ,Routes,Route} from "react-router-dom"
import Body from "./components/Body.jsx"
import Profile from "./components/Profile.jsx"
import Login from "./components/Login.jsx"
import PendingRequest from "./components/PendingRequest.jsx"
import Friends from "./components/Friends.jsx";
import Feed from "./components/Feed.jsx";
import Error from "./components/Error.jsx"
import appStore from "./utlis/appStore.js"
import { Provider } from "react-redux"
import ChatRoom from "./components/ChatRoom.jsx"

function App() {
  

  return (
    <Provider store={appStore}>
   <BrowserRouter>
     <Routes>
      <Route path="/" element={<Body/>}>
       <Route path="/profile" element={<Profile/>}/>
       <Route path="/login" element={<Login/>}/>
       <Route path="/" element={<Feed/>}/>
       <Route path="/friends" element={<Friends/>}/>
       <Route path="/pendingRequest" element={<PendingRequest/>}/>
       <Route path="/chatroom/:toUserId" element={<ChatRoom/>}/>
       <Route path="/error" element={<Error/>}/>
      </Route>
     </Routes>
   </BrowserRouter>
   </Provider>)
     
}

export default App
