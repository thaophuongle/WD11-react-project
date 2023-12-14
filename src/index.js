import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import TaskForm from "./Components/TaskForm";
import TaskList from "./Components/TaskList";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div className="container">
    <h1 className="mt-3" style={{ textAlign: "center" }}>
      To-do App
    </h1>
    <TaskForm />
    <TaskList />
  </div>
);
