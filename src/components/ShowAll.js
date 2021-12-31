import React from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import db from "../firebase/firebase";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import { useState } from "react";

function ShowAll() {
  //method variables
  const { user, setUser } = useContext(UserContext); //UserID
  //states
  const [tasks, setTasks] = useState([]);
  //functions

  useEffect(() => {
    const tasks = query(collection(db, "Users/" + user + "/Tasks"));
    const tasksSnapshot = onSnapshot(tasks, (querySnapshot) => {
      const localTasks = [];
      querySnapshot.forEach((doc) => {
        localTasks.push(doc.data());
      });
      setTasks(localTasks);
    });
    return () => tasksSnapshot();
  }, []);

  return (
    <div>
      {tasks.map((tarea) => {
        console.log(tarea)  
        return (
          <div>
            <li>{tarea.taskTitle}</li>
            <li> {Date(tarea.taskDate)} </li>
            <li>{tarea.taskDescription}</li>
            <br></br>
          </div>
        );
      })}
    </div>
  );
}

export default ShowAll;
