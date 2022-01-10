import React from "react";
import { Button } from "react-bootstrap";

function AddNoteButton() {
  return (
    <div>
      <div className="botonAdd">
        <Button variant="warning" size="lg" onClick={() => console.log("Hola mundo")}>
          +
        </Button>
      </div>
    </div>
  );
}

export default AddNoteButton;
