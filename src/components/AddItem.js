import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import { collection, addDoc, Timestamp} from "firebase/firestore";
import db from "../firebase/firebase";
import "../css/AddButton.css";
import { useContext } from "react";
import UserContext from "../context/UserContext";

function AddItem() {
  //method variables
  const {user,setUser}=useContext(UserContext); //UserID
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

  const handleSubmit = async () => {
    await addDoc(collection(db, "Users/"+user+"/Tasks"), {
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
      })
      .catch((error) => {
        handleClose();
        tostadaAlert.fire({
          icon: "error",
          title: "Something went wrong, please try again :(",
        });
        console.log(error);
      });
  };

  useEffect(() => {}, [task]);

  return (
    <div>
      <div className="modal">
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add a new remaining task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h1>Task title</h1>
            <input
              className="taskTitle"
              name="taskTitle"
              onChange={handleInputChange}
            ></input>
            <br></br>
            <h1>Task date</h1>
            <input
              type="datetime-local"
              className="taskDate"
              name="taskDate"
              onChange={handleInputChange}
            ></input>
            <h1>Task description</h1>
            <textarea
              className="taskDescription"
              name="taskDescription"
              onChange={handleInputChange}
            ></textarea>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => handleSubmit()}
              type="submit"
            >
              Accept
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <div className="botonAdd">
        <Button variant="outline-primary" onClick={() => handleOpen()}>
          +
        </Button>
      </div>
    </div>
  );
}

export default AddItem;
