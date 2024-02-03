import React,{useState} from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./contexts/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  const [mesg,setmsg]=useState(null)
  
  
const showAlert=(message,messageType)=>{
  setmsg({
    msg: message,
    msgType: messageType
  })
  setTimeout(()=>{
    setmsg(null)
  },3000)
}
  return (
    <div className="App">
      <NoteState showAlert={showAlert}>
        <Router>
          <Navbar />
          <Alert message1={mesg} />
          <div className="container">
            <Switch>
              <Route exact path="/">
                <Home showAlert={showAlert} />
              </Route>
              <Route exact path="/about">
                <About />
              </Route>
              <Route exact path="/login">
                <Login showAlert={showAlert}/>
              </Route>
              <Route exact path="/signup">
                <Signup showAlert={showAlert} />
              </Route>
            </Switch>
          </div>
        </Router>
      </NoteState>
    </div>
  );
}

export default App;
