import Button from "react-bootstrap/Button";
import React, { useContext, useEffect, useState } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import db from "../firebase/firebase";
import "../css/TaskItem.css";
import UserContext from "../context/UserContext";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import Swal from "sweetalert2";
import { Modal } from "react-bootstrap";

function TaskItem(props) {
  //variables

  //method variables
  const { user, setUser } = useContext(UserContext); //UserID
  const tostadaAlert = Swal.mixin({
    toast: true,
    position: "top-end",
    timer: 3500,
    timerProgressBar: true,
  });

  //states
  const [description, setDescription] = useState(false);
  const [arrow, setArrow] = useState(false);
  const [show, setShow] = useState(false);
  const [task, setTask] = useState({
    taskTitle: "",
    taskDate: "",
    taskDescription: "",
  });

  //functions
  const dateYearConverter = () => {
    let year = new Date(props.tarea.taskDate.seconds * 1000).getFullYear();
    return year;
  };

  const dateMonthConverter = () => {
    let month = new Date(props.tarea.taskDate.seconds * 1000).getMonth();
    return month;
  };

  const dateDayConverter = () => {
    let day = new Date(props.tarea.taskDate.seconds * 1000).getDay();
    return day;
  };

  const editTask = (taskid) => {
    console.log(taskid);
  };

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

  const deleteTask = async (taskid) => {
    await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteDoc(doc(db, "Users/" + user + "/Tasks", taskid));
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  const handleSubmit = async () => {
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

  useEffect(() => {
    console.log(task.taskTitle);
  }, [task]);
  return (
    <div>
      <div className="modal">
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add a new remaining task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h1>Task title </h1>
            <input
              className="taskTitle"
              name="taskTitle"
              onChange={handleInputChange}
              defaultValue={props.tarea.taskTitle}
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
              defaultValue={props.tarea.taskDescription}
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

      <div className="taskHeader d-flex justify-content-center">
        <h1>{props.tarea.taskTitle}</h1>
        {/*Inicio boton de flecha */}
        <button
          onClick={() => {
            setDescription(!description);
            setArrow(!arrow);
          }}
          className="botonArrow"
        >
          {arrow ? (
            <span className="icon">
              <ion-icon name="chevron-up-outline"></ion-icon>
            </span>
          ) : (
            <span className="icon">
              <ion-icon name="chevron-down-outline"></ion-icon>
            </span>
          )}
        </button>
        {/*Fin boton de flecha */}
      </div>
      <div>
        {description ? (
          <div className="taskBody card">
            <h2>{props.tarea.taskDescription}</h2>
            <h2>{dateDayConverter()+" "+dateMonthConverter()+" "+dateYearConverter()}</h2>
          </div>
        ) : null}
      </div>
      <div className="taskFooter">
        <Button
          variant="outline-primary"
          onClick={() => {
            handleOpen();
          }}
        >
          Edit Task
        </Button>
        <Button
          variant="outline-danger"
          onClick={() => deleteTask(props.tarea.id)}
        >
          Delete Task
        </Button>
      </div>
    </div>
  );
}

export default TaskItem;
