import { collection, onSnapshot, query } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import NoteItem from "../components/NoteItem";
import UserContext from "../context/UserContext";
import db from "../firebase/firebase";
import AddNoteButton from "./AddNoteButton";

function MyNotes() {
  const { user, setUser } = useContext(UserContext); //UserID

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const notes = query(collection(db, "Users/" + user + "/Notes"));
    const notesSnapshot = onSnapshot(notes, (querySnapshot) => {
      const localNotes = [];
      querySnapshot.forEach((doc) => {
        localNotes.push({ ...doc.data(), id: doc.id });
      });
      setNotes(localNotes);
    });
    return () => notesSnapshot();
  }, []);

  return (
    <div>
      {notes.map((note) => {
        return (
          <div key={note.id}>
            <NoteItem note={note}></NoteItem>
          </div>
        );
      })}
      <AddNoteButton></AddNoteButton>
    </div>
  );
}

export default MyNotes;
