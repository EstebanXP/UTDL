import React, { useState } from "react";
import NoteItem from "../components/NoteItem";
import AddNoteButton from "./AddNoteButton";

function MyNotes() {
  const [states, setStates] = useState([
    "asdasd",
    "asaaa",
    "aeeeee",
    "pqpqpqpqq",
    "asdasd",
    "adewaewewadawddadwda",
    "adewaewewadawddadwda",
    "adewaewewadawddadwda",
    "adewaewewadawddadwda",
    "adewaewewadawddadwda",
    "adewaewewadawddadwda",
    "adewaewewadawddadwda",
    "adewaewewadawddadwda",
    "adewaewewadawddadwda",
    "adewaewewadawddadwda",
    "adewaewewadawddadwda",
    "adewaewewadawddadwda",
    
  ]);

  return (
    <div>
      hola mundo
      {states.map((item) => {
        return <NoteItem item={item}></NoteItem>;
      })}
      <AddNoteButton></AddNoteButton>
    </div>
  );
}

export default MyNotes;
