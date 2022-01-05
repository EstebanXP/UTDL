import Button from "react-bootstrap/Button";
import React, { useContext, useEffect, useState } from "react";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
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

  const [taskTitle, setTaskTitle] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  //functions
  const returnMonth = () => {
    const month = props.tarea.taskDate.toDate().getMonth();
    switch (month) {
      case 0:
        return "01";
      case 1:
        return "02";
      case 2:
        return "03";
      case 3:
        return "04";
      case 4:
        return "05";
      case 5:
        return "06";
      case 6:
        return "07";
      case 7:
        return "08";
      case 8:
        return "09";
      case 9:
        return "10";
      case 10:
        return "11";
      case 11:
        return "12";
      default:
        return month;
    }
  };

  const returnDay = () => {
    const day = props.tarea.taskDate.toDate().getDate();
    switch (day) {
      case 1:
        return "01";
      case 2:
        return "02";
      case 3:
        return "03";
      case 4:
        return "04";
      case 5:
        return "05";
      case 6:
        return "06";
      case 7:
        return "07";
      case 8:
        return "08";
      case 9:
        return "09";
      default:
        return day;
    }
  };

  const returnHours = () => {
    const hour = props.tarea.taskDate.toDate().getHours();
    switch (hour) {
      case 1:
        return "01";
      case 2:
        return "02";
      case 3:
        return "03";
      case 4:
        return "04";
      case 5:
        return "05";
      case 6:
        return "06";
      case 7:
        return "07";
      case 8:
        return "08";
      case 9:
        return "09";
      default:
        return hour;
    }
  };

  const returnMinutes = () => {
    const minute = props.tarea.taskDate.toDate().getMinutes();
    switch (minute) {
      case 1:
        return "01";
      case 2:
        return "02";
      case 3:
        return "03";
      case 4:
        return "04";
      case 5:
        return "05";
      case 6:
        return "06";
      case 7:
        return "07";
      case 8:
        return "08";
      case 9:
        return "09";
      default:
        return minute;
    }
  };

  const prueba = () => {
    console.log(
      `${props.tarea.taskDate
        .toDate()
        .getFullYear()}-${returnMonth()}-${returnDay()}T19:30`
    );
  };

  const handleTaskTitle = (event) => {
    setTaskTitle({ taskTitle: event.target.value });
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
    await updateDoc(doc(db, "Users/" + user + "/Tasks", props.tarea.id), {
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
              onChange={handleInputChange}
              defaultValue={props.tarea.taskTitle}
            ></input>
            {console.log(taskTitle)}
            <br></br>
            <h1>Task Date</h1>
            <input
              type="datetime-local"
              className="taskDate"
              name="taskDate"
              id="taskDate"
              onChange={handleInputChange}
              defaultValue={`${props.tarea.taskDate
                .toDate()
                .getFullYear()}-${returnMonth()}-${returnDay()}T${returnHours()}:${returnMinutes()}`}
            ></input>
            <h1>Task description</h1>
            <textarea
              className="taskDescription"
              name="taskDescription"
              id="taskDescription"
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
            returnMinutes();
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
