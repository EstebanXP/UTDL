import React from "react";
import '../css/Login.css'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate();
  const {state}=useLocation();

  return (
    <div className="LoginContainer">
      <h1>Welcome!</h1>
          <h2>Email</h2>
          <input type="email"></input>
          <h2>Password</h2>
          <input type="password"></input>
          <br></br>
          <br></br>
          <NavLink to="/">Back to home</NavLink>
    </div>
  );
}

export default Login;
