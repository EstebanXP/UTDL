import React, { useEffect, useState } from "react";
import "../css/Login.css";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../auth/useAuth";
import Swal from "sweetalert2";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import { Button, FormControl } from "react-bootstrap";

//import db from '../firebase/firebase';

function Login() {
  //method variables
  const navigate = useNavigate();
  const { auth1, login, logout } = useAuth();
  const auth = getAuth();
  const { user, setUser } = useContext(UserContext);
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
        setUser(user.uid);
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
        switch (errorCode) {
          case "auth/wrong-password":
            Swal.fire({
              title: "Error!",
              text: "Wrong Password or email, please check them.",
              icon: "error",
              confirmButtonText: "Ok",
            });
            break;
          case "auth/too-many-requests":
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
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
      } else {
        console.log("bruh");
      }
    });
  }, []);

  return (
    <div className="LoginContainer">
      <div className="cartaContainer card">
        <h1 className="title">Welcome!</h1>
        <div className="cartaInside">
          <form onSubmit={handleSubmit} className="loginForm">
            <h2>Email</h2>
            <FormControl
              className="email"
              type="email"
              name="email"
              size="lg"
              placeholder="example@example.example"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            ></FormControl>
            <h2>Password</h2>
            <FormControl
              className="password"
              type="password"
              name="password"
              size="lg"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              required
            ></FormControl>
            <br></br>
            <Button type="submit">Log In</Button>
          </form>
        </div>
      </div>
      <br></br>
      <br></br>
      <NavLink to="/">Go back home</NavLink>
    </div>
  );
}

export default Login;
