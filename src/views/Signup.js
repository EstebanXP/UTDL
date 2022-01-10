import React, { useContext, useEffect, useState } from "react";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import useAuth from "../auth/useAuth";
import db from "../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import UserContext from "../context/UserContext";
import { Button, FormControl } from "react-bootstrap";
import "../css/Signup.css";

function Signup() {
  //method variables
  const auth = getAuth();
  const { auth1, login, logout } = useAuth();
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  //states
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();

  //functions
  const validEmail = (email) => {
    var re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validEmail(email)) {
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("Entro");
          console.log(user);
          setUser(user.uid);
          setDoc(doc(db, "Users", user.uid), {
            userName: name,
            userPhoneNumber: phoneNumber,
            userEmail: email,
          });
          login()
            .then(() => {
              navigate("/home");
            })
            .catch(() => {
              console.log("Error");
            });
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          switch (errorCode) {
            case "auth/weak-password":
              //Error password too short, must be 6 characters or more long you useless
              Swal.fire({
                title: "Error!",
                text: "Hey, your password must be 6 characters long, please try again :(",
                icon: "error",
                confirmButtonText: "Ok",
              });
              break;
            case "auth/email-already-in-use":
              //Error email already in use you dumb ass
              Swal.fire({
                title: "Error!",
                text: "Hey, the email is already in use, try other email or log in",
                icon: "error",
                confirmButtonText: "Ok",
              });
              break;
            default:
              //Default error, not even i know what is happening
              Swal.fire({
                title: "Error!",
                text: "Something went wrong, please try again later :(",
                icon: "error",
                confirmButtonText: "Ok",
              });
              break;
          }
          // ..
        });
    } else {
      Swal.fire({
        //Error wrong email or password
        title: "Error!",
        text: "Pleas check your email addres and rewrite it",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  useEffect(() => {}, []);
  return (
    <div className="SignUpContainer">
      <div className="signupContainer card">
      <h1>Glad you're in</h1>
        <div className="cartaInside">
          <form className="signupForm" onSubmit={handleSubmit}>
            <h2>Full Name</h2>
            <FormControl
              type="text"
              name="name"
              placeholder="Alan Smithee"
              onChange={(event) => {
                setName(event.target.value);
              }}
            ></FormControl>
            <h2>Accout</h2>
            <FormControl
              type="email"
              name="email"
              placeholder="example@example.example"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            ></FormControl>
            <h2>Password</h2>
            <FormControl
              type="password"
              name="password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            ></FormControl>
            <h2>Phone Number</h2>
            <FormControl
              type="text"
              name="phoneNumber"
              onChange={(event) => {
                setPhoneNumber(event.target.value);
              }}
            ></FormControl>
            <br></br>
            <Button type="submit">Sign up</Button>
          </form>
        </div>
      </div>
      <br></br>
      <br></br>
      <NavLink to="/">go back home</NavLink>
    </div>
  );
}

export default Signup;
