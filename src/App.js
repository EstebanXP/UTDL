import "./App.css";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Prueba from "./views/Prueba";
import { Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import NotFound from "./views/NotFound";
import InitialPage from "./views/InitialPage";
import RequireAuth from "./routes/RequireAuth";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<InitialPage />}>
          <Route path=":login" index element={<Login />}></Route>
          <Route path="register" index element={<Signup />}></Route>
        </Route>

        <Route
          path="/home"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        >
          <Route path="prueba" element={<Prueba></Prueba>}></Route>
        </Route>

        <Route path="*" element={<NotFound></NotFound>}></Route>
      </Routes>
    </div>
  );
}

export default App;
