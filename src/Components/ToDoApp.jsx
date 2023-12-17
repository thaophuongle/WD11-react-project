import React, { useEffect, useState } from "react";
import TaskForm from "./TaskForm";

const ToDoApp = () => {
    const [taskList, setTaskList] = useState(
        JSON.parse(localStorage.getItem("taskList")) || []
      );

      console.log('task list', taskList)
    
      useEffect(() => {
        // Save the task list to local storage whenever it changes
        localStorage.setItem("taskList", JSON.stringify(taskList));
      }, [taskList]);

    //Add new task to the task list
const addTask = (newTask) => {
     // Create a new array with the existing tasks
    const updatedTaskList = [...taskList]

    //Add a new task to the new array
    updatedTaskList.push(newTask);
    setTaskList(updatedTaskList);

}

//Delete a task in the list
const deleteTask = (taskId) => {
    // Filter out the task with the specified id
    const updatedTaskList = taskList.filter((task) => task.id !== taskId);
  
    // Set the state with the new array
    setTaskList(updatedTaskList);
  };

  return (
    <div className="container">
      <h1 className="mt-3" style={{ textAlign: "center" }}>
        To-do App
      </h1>
      <TaskForm addTask={addTask}/>
      <div className="mt-5">
        <h4>Task List</h4>
        <table className="table">
          <thead>
            <tr className="table-primary">
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Due Date</th>
              <th scope="col">Assign To</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {
                taskList.map((task) => {
                   return <tr scope="row" key={task.id}>
              <td>{task.id}</td>
              <td>{task.name}</td>
              <td>{task.description}</td>
              <td>{task.dueDate}</td>
              <td>{task.assignedTo}</td>
              <td>{task.status}</td>
              <td>
                <button className="btn btn-warning">
                  <i className="fa fa-edit"></i>
                </button>
                <button className="btn btn-danger mx-2"
                 onClick={() => deleteTask(task.id)}>
                  <i className="fa fa-close"></i>
                </button>
              </td>
            </tr>
                })
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ToDoApp;
