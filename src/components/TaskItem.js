import React, { useState } from "react";
import '../css/TaskItem.css'

function TaskItem(props) {
  //method variables

  //states
  const [description, setDescription] = useState(false);

  //functions

  return (
    <div>
      <div className="taskHeader d-flex justify-content-center">
        <h1>{props.tarea.taskTitle}</h1>
      </div>
      <div>
        {description ? (
          <div className="taskBody card">
            <h2>{props.tarea.taskDescription}</h2>
            <h2>{new Date(props.tarea.taskDate * 1000).toISOString()}</h2>
          </div>
        ) : null}
      </div>
      <div className="taskFooter">


      </div>
    </div>
  );
}

export default TaskItem;
