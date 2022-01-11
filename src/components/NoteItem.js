import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "../css/NoteItem.css";

function NoteItem(props) {
  //method variables

  //states
  const [description, setDescription] = useState(false);
  const [arrow, setArrow] = useState(false);

  //functions

  return (
    <div>
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

      {description ? <div className="description card">
          {props.note.noteDescription}
      </div> : null}
      <Button variant="primary">Edit</Button>
      <Button variant="danger">Delete</Button>
      <hr></hr>
    </div>
  );
}

export default NoteItem;
