import React, { useEffect, useState } from "react";
import "../css/Login.css";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../auth/useAuth";
import Swal from "sweetalert2";

//import db from '../firebase/firebase';

function Login() {
  //method variables
  const navigate = useNavigate();
  const { auth1, login, logout } = useAuth();
  const auth = getAuth();
  //States
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  //Functions
  const handleSubmit = async (event) => {
    event.preventDefault();
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // ...
        login()
          .then(() => {
            navigate("/home");
          })
          .catch(() => {
            console.log("Errir");
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
        switch (errorCode) {
          case 'auth/wrong-password':
            Swal.fire({
              title: "Error!",
              text: "Wrong Password or email, please check them.",
              icon: "error",
              confirmButtonText: "Ok",
            });
            break;
          case 'auth/too-many-requests':
            Swal.fire({
              title: "Error!",
              text: "Hey, you're trying to get it but you failed too many times. Wait a moment and check your email and password.",
              icon: "error",
              confirmButtonText: "Ok",
            });
            break;
          default:
            Swal.fire({
              title: "Error!",
              text: "Something has happend, please try again later please",
              icon: "error",
              confirmButtonText: "Ok",
            });
            break;
        }
      });
  };

  useEffect(() => {
    console.log(email);
    console.log(password);
  }, [email, password]);

  return (
    <div className="LoginContainer">
      <h1>Welcome!</h1>
      <form onSubmit={handleSubmit} className="loginForm">
        <h2>Accout</h2>
        <input
          type="email"
          name="email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        ></input>
        <h2>Password</h2>
        <input
          type="password"
          name="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        ></input>
        <br></br>
        <button type="submit">Log in</button>
      </form>
      <br></br>
      <br></br>
      <NavLink to="/">Back to home</NavLink>
    </div>
  );
}

export default Login;
