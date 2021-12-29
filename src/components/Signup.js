import React, { useEffect, useState } from "react";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import app from '../firebase/firebase'
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import useAuth from '../auth/useAuth'
import useAuthExample from '../auth/useAuthExample';

function Signup() {
  //method variables
  const auth = getAuth(app);
  const {auth1,login,logout} = useAuth();
  const {state} = useLocation();
  const navigate = useNavigate();
  const [authUser,setAuthUser] = useAuthExample();
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
        console.log("Entro");
        alert(user + "asr");

       login()
         .then(()=>{
          navigate("/home");
        })
         .catch(()=>{
          console.log("Errir");
         });
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("Entro un error, no se cual");
        // ..
      });
  };

  const prueba = () =>{
    console.log(authUser);
  }

  useEffect(() => {

  }, []);
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
      <button onClick={()=>prueba()}>prueba</button>
      <button onClick={setAuthUser}>AAA</button>
      <br></br>
      <br></br>
      <NavLink to="/">Back to home</NavLink>
    </div>
  );
}

export default Signup;
