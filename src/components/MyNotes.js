import React, { useState } from "react";
import NoteItem from "../components/NoteItem";

function MyNotes() {
  const [states, setStates] = useState([
    "asdasd",
    "asaaa",
    "aeeeee",
    "pqpqpqpqq",
    "asdasd",
  ]);

  return (
    <div>
      hola mundo
      {states.map((item) => {
        return <NoteItem item={item}></NoteItem>;
      })}
    </div>
  );
}

export default MyNotes;
