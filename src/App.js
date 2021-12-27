import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Prueba from "./components/Prueba";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import InitialPage from "./components/InitialPage";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<InitialPage />}> 
          <Route path=":login" index element={<Login />}></Route>
          <Route path="register" index element={<Signup />}></Route>
        </Route>
        
        <Route path="/register" element={<Signup></Signup>}></Route>
        <Route path="/home" element={<Home></Home>}>
          {/* Si se añade una subruta, para poder verlo en otro componente se debe añadir el componente <Outlet> */}
          <Route path=":prueba" element={<Prueba></Prueba>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
