import React, { useState, useEffect } from "react";
import { Button, FormControl, Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import db from "../firebase/firebase";
import "../css/AddButton.css";
import { useContext } from "react";
import UserContext from "../context/UserContext";

function AddItem() {
  //method variables
  const { user, setUser } = useContext(UserContext); //UserID
  const tostadaAlert = Swal.mixin({
    toast: true,
    position: "top-end",
    timer: 3500,
    timerProgressBar: true,
  });

  //states
  const [show, setShow] = useState(false);
  const [task, setTask] = useState({
    taskTitle: "",
    taskDate: "",
    taskDescription: "",
  });

  //functions
  const handleOpen = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleInputChange = (event) => {
    setTask({
      ...task,
      [event.target.name]: event.target.value,
    });
  };

  const inputEmpty = () => {
    return !task.taskTitle.trim().length;
  };

  const inputTooLong = () => {
    return task.taskTitle.length;
  };

  const isDateNull = () => {
    if(task.taskDate===""){
      return true;
    }
    return false;
  }

  const handleSubmit = async () => {
    if (inputEmpty()) {
      tostadaAlert.fire({
        icon: "error",
        title: "Task Must Have a Title",
      });
    } else if (inputTooLong() > 50) {
      tostadaAlert.fire({
        icon: "error",
        title: "Is a title, not a description",
        text: "Add a shorter title!",
      });
    } else if(isDateNull()){
      tostadaAlert.fire({
        icon: "error",
        title: "There is no Date",
        text: "Add a date to your task, also you can create a note!",
      });
    } 
    
    else {
      await addDoc(collection(db, "Users/" + user + "/Tasks"), {
        taskTitle: task.taskTitle,
        taskDate: Timestamp.fromDate(new Date(task.taskDate)),
        taskDescription: task.taskDescription,
      })
        .then(() => {
          handleClose();
          tostadaAlert.fire({
            icon: "success",
            title: "Task Saved Succesfully",
          });
          setTask({ taskTitle: "", taskDate: "", taskDescription: "" });
        })
        .catch((error) => {
          handleClose();
          tostadaAlert.fire({
            icon: "error",
            title: "Something went wrong, please try again :(",
          });
        });
    }
  };

  useEffect(() => {}, []);

  return (
    <div>
      <div className="modal">
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add a new remaining task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h1>Task title</h1>
            <FormControl
              className="taskTitle"
              name="taskTitle"
              onChange={handleInputChange}
              required
            ></FormControl>
            <br></br>
            <h1>Task date</h1>
            <input
              type="datetime-local"
              className="taskDate"
              name="taskDate"
              onChange={handleInputChange}
            ></input>
            <br></br>
            <br></br>
            <h1>Task description</h1>
            <FormControl
              as="textarea"
              className="taskDescription"
              name="taskDescription"
              onChange={handleInputChange}
            ></FormControl>
          </Modal.Body>
          <div className="footer">
            <Modal.Footer>
              <Button
                variant="primary"
                onClick={() => handleSubmit()}
                type="submit"
              >
                Accept
              </Button>
            </Modal.Footer>
          </div>
        </Modal>
      </div>
      <div className="botonAdd">
        <Button variant="warning" size="lg" onClick={() => handleOpen()}>
          +
        </Button>
      </div>
    </div>
  );
}

export default AddItem;
