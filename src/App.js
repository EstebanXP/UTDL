import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Prueba from "./components/Prueba";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import InitialPage from "./components/InitialPage";
import RequireAuth from "./routes/RequireAuth";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<InitialPage />}> 
          <Route path=":login" index element={<Login />}></Route>
          <Route path="register" index element={<Signup />}></Route>
        </Route>
        
        <Route path="/home" element={<RequireAuth><Home /></RequireAuth>}>
          
        </Route>
        
        <Route path="*" element={<NotFound></NotFound>}></Route>
      </Routes>
    </div>
  );
}

export default App;
