import Button from "react-bootstrap/Button";
import React, { useContext, useEffect, useState } from "react";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import db from "../firebase/firebase";
import "../css/TaskItem.css";
import UserContext from "../context/UserContext";
import { Timestamp } from "firebase/firestore";
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

  const [taskTitle, setTaskTitle] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [taskDate, setTaskDate] = useState("");

  //functions
  const returnMonth = () => {
    const month = props.tarea.taskDate.toDate().getMonth();
    if(month<12){
      return `0${month+1}`
    }
    return month;
  };

  const returnDay = () => {
    const day = props.tarea.taskDate.toDate().getDate();
    if(day<10){
      return `0${day+1}`
    }
    return day;
  };

  const returnHours = () => {
    const hour = props.tarea.taskDate.toDate().getHours();
    if(hour<10){
      return `0${hour+1}`
    }
    return hour;
  };

  const returnMinutes = () => {
    const minute = props.tarea.taskDate.toDate().getMinutes();
    if(minute<10){
      return `0${minute+1}`
    }
    return minute;
  };

  const handleOpen = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const onChangeTitle = (event) => {
    setTaskTitle(event.target.value);
  };

  const onChangeDesc = (event) => {
    setTaskDesc(event.target.value);
  };

  const onChangeDate = (event) => {
    setTaskDate(event.target.value);
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
    await updateDoc(doc(db, "Users/" + user + "/Tasks", props.tarea.id), {
      taskTitle: taskTitle,
      taskDate: Timestamp.fromDate(new Date(taskDate)),
      taskDescription: taskDesc,
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
    setTaskTitle(props.tarea.taskTitle);
    setTaskDesc(props.tarea.taskDescription);
    setTaskDate(
      `${props.tarea.taskDate
        .toDate()
        .getFullYear()}-${returnMonth()}-${returnDay()}T${returnHours()}:${returnMinutes()}`
    );
  }, []);
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
              id="taskTitle"
              onChange={onChangeTitle}
              value={taskTitle}
            ></input>
            <br></br>
            <h1>Task Date</h1>
            <input
              type="datetime-local"
              className="taskDate"
              name="taskDate"
              id="taskDate"
              value={taskDate}
              onChange={onChangeDate}
            ></input>
            <h1>Task description</h1>
            <textarea
              className="taskDescription"
              name="taskDescription"
              id="taskDescription"
              value={taskDesc}
              onChange={onChangeDesc}
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
            <h2>
              {`${props.tarea.taskDate
                .toDate()
                .getFullYear()}-${returnMonth()}-${returnDay()}   ${returnHours()}:${returnMinutes()}`}
            </h2>
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
