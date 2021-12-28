import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import auth from '../firebase/firebase' 
import { createUserWithEmailAndPassword } from "firebase/auth";


function Signup() {
  //method variables

  //states
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();

  //functions
  const handleSubmit = async (event) => {
    event.preventDefault();
    await createUserWithEmailAndPassword(auth,email,password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode+errorMessage);
        // ..
      });
  };

  useEffect(() => {}, []);
  return (
    <div className="SignUpContainer">
      <h1>Glad you're in</h1>
      <form className="signupForm" onSubmit={handleSubmit}>
        <h2>Full Name</h2>
        <input type="text" name="name" onChange={(event)=> {setName(event.target.value)}}></input>
        <h2>Accout</h2>
        <input type="email" name="email" onChange={(event)=> {setEmail(event.target.value)}}></input>
        <h2>Password</h2>
        <input type="password" name="password" onChange={(event)=> {setPassword(event.target.value)}}></input>
        <h2>Phone Number</h2>
        <input type="text" name="phoneNumber" onChange={(event)=> {setPhoneNumber(event.target.value)}}></input>
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
