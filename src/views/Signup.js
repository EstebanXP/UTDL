import React, { useEffect, useState } from "react";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import useAuth from "../auth/useAuth";
import db from "../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import Swal from "sweetalert2";

function Signup() {
  //method variables
  const auth = getAuth();
  const { auth1, login, logout } = useAuth();
  const navigate = useNavigate();
  //states
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();

  //functions
  const validEmail = (email) => {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(validEmail(email)){
      await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("Entro");
        console.log(user);
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
            console.log("Errir");
          });
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
        switch (errorCode) {
          case "auth/weak-password":
            Swal.fire({
              title: "Error!",
              text: "Hey, your password must be 6 characters long",
              icon: "error",
              confirmButtonText: "Ok",
            });
            break;
          case "auth/email-already-in-use":
              Swal.fire({
                title: "Error!",
                text: "Hey, the email is already in use, try other email or log in",
                icon: "error",
                confirmButtonText: "Ok",
              });
              break;
          default:
            Swal.fire({
              title: "Error!",
              text: "Something has happened, please try again later",
              icon: "error",
              confirmButtonText: "Ok",
            });
            break;
        }
        // ..
      });
    }else{
      Swal.fire({
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
      <h1>Glad you're in</h1>
      <form className="signupForm" onSubmit={handleSubmit}>
        <h2>Full Name</h2>
        <input
          type="text"
          name="name"
          placeholder="Alan Smithee"
          onChange={(event) => {
            setName(event.target.value);
          }}
        ></input>
        <h2>Accout</h2>
        <input
          type="email"
          name="email"
          placeholder="example@example.example"
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
        <h2>Phone Number</h2>
        <input
          type="text"
          name="phoneNumber"
          onChange={(event) => {
            setPhoneNumber(event.target.value);
          }}
        ></input>
        <br></br>
        <button type="submit">Sign Up</button>
      </form>
      <br></br>
      <br></br>
      <NavLink to="/">Back to home</NavLink>
    </div>
  );
}

export default Signup;
