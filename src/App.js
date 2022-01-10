import "./App.css";
import Login from "./views/Login";
import Signup from "./views/Signup";
import { Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import NotFound from "./views/NotFound";
import InitialPage from "./views/InitialPage";
import RequireAuth from "./routes/RequireAuth";
import { useState } from "react";
import UserContext from "./context/UserContext";
import ShowAll from "./components/ShowAll";
import MyNotes from "./components/MyNotes";

function App() {
  const [user, setUser] = useState(null);
  const [userAuth, setUserAuth] = useState(null);

  return (
    <div className="App">
      <UserContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route path="/" element={<InitialPage />}>
            <Route path=":login" index element={<Login authObj={{userAuth,setUserAuth}} />}></Route>
            <Route path="register" index element={<Signup authObj={{userAuth,setUserAuth}} />}></Route>
          </Route>
            <Route
              path="/home"
              element={
                <RequireAuth>
                  {" "}
                  <Home authObj={{userAuth,setUserAuth}}/>{" "}
                </RequireAuth>
              }
            >
              <Route path="all" element={<ShowAll></ShowAll>}></Route>
              <Route path="notes" element={<MyNotes></MyNotes>}></Route>
            </Route>
          <Route path="*" element={<NotFound></NotFound>}></Route>
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
