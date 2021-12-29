import React, { useEffect, useState } from "react";
import "../css/Login.css";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import useAuthExample from "../auth/useAuthExample";
//import db from '../firebase/firebase';

function Login() {
  //method variables
  const navigate = useNavigate();
  const { state } = useLocation();
  const [authUser,setAuthUser] = useAuthExample();
  //States
  const [email,setEmail] = useState();
  const [password,setPassword] = useState();
  //Functions
  const handleSubmit= (event)=> {
    event.preventDefault();
    setEmail(event.target.elements.email.value) // from elements property      // or directly
    setPassword(event.target.elements.password.value)
  }
  
  const firebaseLogin =() => {

  }

  const prueba = () =>{
    console.log(authUser);
  }

  const prueba2 = () => {
  }

  useEffect(()=>{
    console.log(email);
    console.log(password);
  },[email,password]);

  return (
    <div className="LoginContainer">
      <h1>Welcome!</h1>
      <form onSubmit={handleSubmit} className="loginForm">
        <h2>Email</h2>
        <input type="email" name="email" ></input>
        <h2>Password</h2>
        <input type="password" name="password"></input>
        <button type="submit">Log in</button>
      </form>
      <button onClick={setAuthUser}>AAA</button>
      <br></br>
      <br></br>
      <NavLink to="/">Back to home</NavLink>
    </div>
  );
}

export default Login;
