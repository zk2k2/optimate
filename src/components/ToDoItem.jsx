import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faXmark,
  faClockRotateLeft,
  faSignal,
  faCircleInfo,
  faStopwatch,
} from "@fortawesome/free-solid-svg-icons";

import { Button } from "react-bootstrap";
import "../assets/styles/objectives.css";
import { useState, useEffect } from "react";

const ToDoItem = ({
  title,
  duration,
  dueDate,
  priority,
  difficulty,
  description,
  itemId,
}) => {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const removeObjective = (itemId) => {
    const newTodos = todos.filter((todo) => todo.id !== itemId);
    setTodos(...newTodos);
  };

  let durationColor = "";
  let priorityColor = "";
  let difficultyColor = "";
  let dueDateColor = "";

  if (
    duration === "<15 minutes" ||
    duration === "15 minutes" ||
    duration === "30 minutes"
  ) {
    durationColor = "low";
  } else if (duration === "45 minutes" || duration === "1 hour") {
    durationColor = "medium";
  } else if (duration === "1.5 hours" || duration === "2 hours") {
    durationColor = "high";
  } else if (duration === "2.5 hours" || duration === "3 hours") {
    durationColor = "critical";
  }

  if (priority === "Low Priority") {
    priorityColor = "low";
  } else if (priority === "Medium Priority") {
    priorityColor = "medium";
  } else if (priority === "High Priority") {
    priorityColor = "high";
  } else if (priority === "Critical Priority") {
    priorityColor = "critical";
  }

  if (difficulty === "Easy") {
    difficultyColor = "low";
  } else if (difficulty === "Medium") {
    difficultyColor = "medium";
  } else if (difficulty === "Hard") {
    difficultyColor = "high";
  }
  const now = new Date();
  const dueDateObj = new Date(dueDate);
  const diff = dueDateObj.getTime() - now.getTime();
  const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
  if (diffDays < 0) {
    dueDateColor = "critical";
  } else if (diffDays < 3) {
    dueDateColor = "high";
  } else if (diffDays < 7) {
    dueDateColor = "medium";
  } else {
    dueDateColor = "low";
  }

  return (
    <div className={`to-do-item border border-black rounded  m-3`}>
      <div className="objective-header d-flex justify-content-between m-2">
        <div className="title ">
          <h4 className="text-secondary">{title}</h4>
        </div>
        <div className="do-undo">
          <Button variant="bg-white">
            <FontAwesomeIcon
              icon={faCheck}
              size="xl"
              className="text-primary"
            />
          </Button>
          <Button
            variant="bg-white"
            onClick={() => {
              console.log("Hi");
              removeObjective(itemId);
            }}
          >
            <FontAwesomeIcon
              icon={faXmark}
              size="xl"
              className="text-quaternary"
            />
          </Button>
        </div>
      </div>
      <div className="objective-description mx-2">
        <p className="text-primary">{description}</p>
      </div>
      <div className="objective-details d-flex justify-content-between m-2 ">
        <div className="objective-due-date">
          <FontAwesomeIcon
            icon={faClockRotateLeft}
            className={`text-${dueDateColor} mx-1`}
          />
          <span className={`text-${dueDateColor} mx-1`}>{dueDate}</span>
        </div>
        <div className="objective-duration">
          <FontAwesomeIcon
            icon={faStopwatch}
            className={`text-${durationColor}`}
          />
          <span className={`text-${durationColor} mx-1`}>{duration}</span>
        </div>
        <div className="priority-level">
          <FontAwesomeIcon
            icon={faCircleInfo}
            className={`text-${priorityColor} mx-1`}
          />
          <span className={`text-${priorityColor} mx-1`}>{priority}</span>
        </div>
        <div className="difficulty-level">
          <FontAwesomeIcon
            icon={faSignal}
            className={`text-${difficultyColor} mx-1`}
          />
          <span className={`text-${difficultyColor} mx-1`}>{difficulty}</span>
        </div>
      </div>
    </div>
  );
};
export default ToDoItem;
