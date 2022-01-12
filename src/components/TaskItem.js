import Button from "react-bootstrap/Button";
import React, { useContext, useEffect, useState } from "react";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import db from "../firebase/firebase";
import classNames from "classnames";
import "../css/TaskItem.css";
import UserContext from "../context/UserContext";
import { Timestamp } from "firebase/firestore";
import Swal from "sweetalert2";
import { FormControl, Modal } from "react-bootstrap";

function TaskItem(props) {
  //variables
  const dateNow = new Date();

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
  const [isGreen, setIsGreen] = useState(false);
  const [isYellow, setIsYellow] = useState(false);
  const [isRed, setIsRed] = useState(false);
  const [isBlack, setIsBlack] = useState(false);
  const [status, setStatus] = useState(0);

  //functions
  const returnMonth = () => {
    const month = props.tarea.taskDate.toDate().getMonth();
    if (month < 10) {
      return `0${month + 1}`;
    } else {
      return month;
    }
  };

  const returnDay = () => {
    const day = props.tarea.taskDate.toDate().getDate();
    if (day < 10) {
      return `0${day + 1}`;
    }
    return day;
  };

  const returnHours = () => {
    const hour = props.tarea.taskDate.toDate().getHours();
    if (hour < 10) {
      return `0${hour + 1}`;
    }
    return hour;
  };

  const returnMinutes = () => {
    const minute = props.tarea.taskDate.toDate().getMinutes();
    if (minute < 10) {
      return `0${minute + 1}`;
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

  const isDateNull = () => {
    if (taskDate === "") {
      return true;
    }
    return false;
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
        tostadaAlert.fire({
          icon: "success",
          title: "Deleted",
          text: "Your task has been deleted.",
        });
      }
    });
  };

  const inputTooLong = () => {
    return taskTitle.length;
  };

  const inputEmpty = () => {
    return !taskTitle.trim().length;
  };

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
    } else if (isDateNull()) {
      tostadaAlert.fire({
        icon: "error",
        title: "There is no Date",
        text: "Add a date to your task!",
      });
    } else {
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
          setTaskTitle("");
          setTaskDate("");
          setTaskDesc("");
        })
        .catch((error) => {
          handleClose();
          tostadaAlert.fire({
            icon: "error",
            title: "Something went wrong, please try again :(",
          });
          console.log(error);
        });
    }
  };

  const returnStatus = () => {
    switch (status) {
      case 0:
        return "Delayed";
      case 1:
        return "Critical";
      case 2:
        return "Time to work on";
      case 3:
        return "On time";
      default:
        return "Status";
    }
  };

  useEffect(() => {
    setTaskTitle(props.tarea.taskTitle);
    setTaskDesc(props.tarea.taskDescription);
    setTaskDate(
      `${props.tarea.taskDate
        .toDate()
        .getFullYear()}-${returnMonth()}-${returnDay()}T${returnHours()}:${returnMinutes()}`
    );

    if (Math.round((props.tarea.taskDate.toDate() - dateNow) / 86400000) <= 0) {
      setIsBlack(true);
      setIsRed(false);
      setIsGreen(false);
      setIsYellow(false);
      setStatus(0);
    } else if (
      Math.round((props.tarea.taskDate.toDate() - dateNow) / 86400000) > 0 &&
      Math.round((props.tarea.taskDate.toDate() - dateNow) / 86400000) < 3
    ) {
      setIsRed(true);
      setIsGreen(false);
      setIsYellow(false);
      setIsBlack(false);
      setStatus(1);
    } else if (
      Math.round((props.tarea.taskDate.toDate() - dateNow) / 86400000) >= 3 &&
      Math.round((props.tarea.taskDate.toDate() - dateNow) / 86400000) < 5
    ) {
      setIsYellow(true);
      setIsRed(false);
      setIsGreen(false);
      setIsBlack(false);
      setStatus(2);
    } else {
      setIsGreen(true);
      setIsYellow(false);
      setIsRed(false);
      setIsBlack(false);
      setStatus(3);
    }
  }, []);

  return (
    <div>
      <div className="modal">
        <Modal
          show={show}
          onHide={handleClose}
          onExiting={() => {
            setTaskTitle(props.tarea.taskTitle);
            setTaskDesc(props.tarea.taskDescription);
            setTaskDate(
              `${props.tarea.taskDate
                .toDate()
                .getFullYear()}-${returnMonth()}-${returnDay()}T${returnHours()}:${returnMinutes()}`
            );
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit your task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h1>Task title </h1>
            <FormControl
              className="taskTitle "
              name="taskTitle"
              id="taskTitle"
              onChange={onChangeTitle}
              value={taskTitle}
            ></FormControl>
            <br></br>
            <h1>Task date</h1>
            <input
              type="datetime-local"
              className="taskDate"
              name="taskDate"
              id="taskDate"
              value={taskDate}
              onChange={onChangeDate}
            ></input>
            <br></br>
            <br></br>
            <h1>Task description</h1>
            <FormControl
              className="taskDescription"
              name="taskDescription"
              id="taskDescription"
              value={taskDesc}
              as="textarea"
              onChange={onChangeDesc}
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

      <div
        className={classNames("taskHeader", {
          "taskHeader-green": isGreen,
          "taskHeader-yellow": isYellow,
          "taskHeader-red": isRed,
          "taskHeader-black": isBlack,
        })}
      >
        <div className="taskHeaderText">
          <h1>{props.tarea.taskTitle}</h1>
        </div>
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
              {`This has to be done before ${props.tarea.taskDate
                .toDate()
                .getFullYear()}-${returnMonth()}-${returnDay()} at ${returnHours()}:${returnMinutes()}`}
            </h2>
            <h2>{`Status: ${returnStatus()}`}</h2>
          </div>
        ) : null}
      </div>
      <div className="taskFooter">
        {/***Inicio footer botones de editar y borrar */}
        <Button
          variant="primary"
          className="botonEditar"
          onClick={() => {
            handleOpen();
          }}
        >
          Edit
        </Button>
        <Button
          variant="danger"
          className="botonBorrar"
          onClick={() => deleteTask(props.tarea.id)}
        >
          Delete
        </Button>
      </div>
      <hr className="linea"></hr>
      {/***Fin footer botones de editar y borrar */}
    </div>
  );
}

export default TaskItem;
