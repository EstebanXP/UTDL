import React from "react";
import { collection, query,  onSnapshot, orderBy } from "firebase/firestore";
import { useEffect } from "react";
import db from "../firebase/firebase";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import { useState } from "react";
import TaskItem from "./TaskItem";

function ShowAll() {
  //method variables
  const { user, setUser } = useContext(UserContext); //UserID
  //states
  const [tasks, setTasks] = useState([]);
  //functions


  //firebase useEffect
  useEffect(() => {
    const tasks = query(collection(db, "Users/" + user + "/Tasks"),orderBy("taskDate"));
    const tasksSnapshot = onSnapshot(tasks, (querySnapshot) => {
      const localTasks = [];
      querySnapshot.forEach((doc) => {
        localTasks.push({ ...doc.data(), id: doc.id });
      });
      setTasks(localTasks);
    });
    return () => tasksSnapshot();
  }, []);

  return (
    <div>
      {tasks.map((tarea) => {
        return (
          <div key={tarea.id}>
            <TaskItem tarea={tarea} ></TaskItem>
            <br></br>
          </div>
        );
      })}
    </div>
  );
}

export default ShowAll;