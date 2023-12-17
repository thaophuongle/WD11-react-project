import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import TaskForm from "./Components/TaskForm";
import ToDoApp from "./Components/ToDoApp";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <ToDoApp />
  </>
);
