import React, { useContext, useEffect, useState } from "react";
import { Button, FormControl, Modal } from "react-bootstrap";
import { collection, addDoc } from "firebase/firestore";
import db from "../firebase/firebase";
import Swal from "sweetalert2";
import UserContext from "../context/UserContext";
import '../css/AddNoteButton.css';

function AddNoteButton() {
  //method functions
  const { user, setUser } = useContext(UserContext); //UserID
  //the mini modal on upper left corner
  const tostadaAlert = Swal.mixin({
    toast: true,
    position: "top-end",
    timer: 3500,
    timerProgressBar: true,
  });

  //states
  const [show, setShow] = useState(false);
  const [note, setNote] = useState({
    noteTitle: "",
    noteDescription: "",
  });

  //functions
  //functions to open and close the modal
  const handleOpen = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  //function to save changes on inputs
  const handleInputChange = (event) => {
    setNote({
      ...note,
      [event.target.name]: event.target.value,
    });
  };

  const saveNote = async() => {
    console.log(note);
    await addDoc(collection(db, "Users/" + user + "/Notes"), {
      noteTitle: note.noteTitle,
      noteDescription: note.noteDescription,
    })
    .then(()=>{
      handleClose();
      tostadaAlert.fire({
        icon: "success",
        title: "Task Saved Succesfully",
      });
      setNote({noteTitle:"",noteDescription:""});
    })
    .catch((error)=>{
      console.log(error);
    })
  }

  useEffect(() => {
  }, []);

  return (
    <div>
      <div className="modal">
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add a new note</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h1>Note title</h1>
            <FormControl
              className="noteTitle"
              name="noteTitle"
              onChange={handleInputChange}
              required
            ></FormControl>
            <br></br>
            <br></br>
            <h1>Note description</h1>
            <FormControl
              as="textarea"
              className="noteDescription"
              name="noteDescription"
              onChange={handleInputChange}
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
      <div className="botonAdd">
        <Button variant="warning" size="lg" onClick={() => handleOpen()}>
          +
        </Button>
      </div>
    </div>
  );
}

export default AddNoteButton;
