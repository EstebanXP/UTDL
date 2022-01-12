import { doc, updateDoc } from "@firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { Button, FormControl, Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import UserContext from "../context/UserContext";
import "../css/NoteItem.css";
import db from "../firebase/firebase";

function NoteItem(props) {
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
  const [noteTitle, setNoteTitle] = useState("");
  const [noteDescription, setNoteDescription] = useState("");
  const [show, setShow] = useState(false);
  const [arrow, setArrow] = useState(false);
  const [note, setNote] = useState({
    noteTitle: "",
    noteDescription: "",
  });

  //functions
  //function to save changes on inputs
  const onChangeTitle = (event) => {
    setNoteTitle(event.target.value);
  };
  const onChangeDescription = (event) => {
    setNoteDescription(event.target.value);
  };

  const saveNote = async () => {
    await updateDoc(doc(db, "Users/" + user + "/Notes", props.note.id), {
      noteTitle: note.noteTitle,
      noteDescription: note.noteDescription,
    })
      .then(() => {
        handleClose();
        tostadaAlert.fire({
          icon: "success",
          title: "Task Saved Succesfully",
        });
        setNote({ noteTitle: "", noteDescription: "" });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleOpen = () => {
    setShow(true);
  };

  useEffect(() => {
    setNoteTitle(props.note.noteTitle);
    setNoteDescription(props.note.noteDescription);
  }, []);

  return (
    <div>
      <div>
        <Modal
          show={show}
          onHide={handleClose}
          onExiting={() => {
            setNoteTitle(props.note.noteTitle);
            setNoteDescription(props.note.noteDescription);
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit your note</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h1>Note title</h1>
            <FormControl
              className="noteTitle"
              name="noteTitle"
              value={noteTitle}
              onChange={onChangeTitle}
              required
            ></FormControl>
            <br></br>
            <br></br>
            <h1>Note description</h1>
            <FormControl
              as="textarea"
              className="noteDescription"
              name="noteDescription"
              value={noteDescription}
              onChange={onChangeDescription}
            ></FormControl>
          </Modal.Body>
          <div className="footer">
            <Modal.Footer>
              <Button
                variant="primary"
                onClick={() => saveNote()}
                type="submit"
              >
                Accept
              </Button>
            </Modal.Footer>
          </div>
        </Modal>
      </div>

      <div className="noteHeader">
        <h1>{props.note.noteTitle} </h1>

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

      {description ? (
        <div className="description card">
          <h2>{props.note.noteDescription}</h2>
        </div>
      ) : null}
      <Button variant="primary" onClick={() => handleOpen()}>
        Edit
      </Button>
      <Button variant="danger">Delete</Button>
      <hr></hr>
    </div>
  );
}

export default NoteItem;
