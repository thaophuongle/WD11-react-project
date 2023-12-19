import React, { useEffect, useState } from "react";
import TaskForm from "./TaskForm";

const ToDoApp = () => {
  const [taskList, setTaskList] = useState(
    JSON.parse(localStorage.getItem("taskList")) || []
  );

  console.log("task list", taskList);

  const [editedTask, setEditedTask] = useState(undefined);

  const [idCounter, setIdCounter] = useState(
    taskList.length > 0 ? Math.max(...taskList.map((task) => task.id)) + 1 : 1
  ); //if there are tasks in the list, calculate the next available ID based on the maximum existing id, otherwise, it starts with 1

  useEffect(() => {
    // Save the task list to local storage whenever it changes
    localStorage.setItem("taskList", JSON.stringify(taskList));
  }, [taskList]);

  //Add new task to the task list
  const addTask = (newTask) => {
    // Create a new array with the existing tasks
    const updatedTaskList = [...taskList];

    // Set the id of the new task using the current idCounter value
    newTask.id = idCounter;

    // Increment the idCounter for the next task
    setIdCounter(idCounter + 1);

    // Add a new task to the new array
    updatedTaskList.push(newTask);
    setTaskList(updatedTaskList);
  };

  //Delete a task in the list
  const deleteTask = (taskId) => {
    // Filter out the task with the specified id
    const updatedTaskList = taskList.filter((task) => task.id !== taskId);

    // Set the state with the new array
    setTaskList(updatedTaskList);
  };

  //Edit a task
  const editTask = (chosenTask) => {
    setEditedTask({ ...chosenTask });
    console.log("edit task:", chosenTask);
  };

  //Update a task
  const updateTask = (updatedTask) => {
    setTaskList((prevTaskList) => {
      // Use the map function to create a new array based on the previous task list
      return prevTaskList.map((task) => {
        // Check if the current task's ID matches the ID of the updated task
        if (task.id === updatedTask.id) {
          // If yes, replace the current task with the updated task
          return updatedTask;
        } else {
          // If no, keep the current task unchanged
          return task;
        }
      });
    });
  };


  const [sortingOption, setSortingOption] = useState("default"); // State to set sorting option
// Sort tasks based on the current sorting option
const sortingTaskList = () => {
  if (sortingOption === "default") {
    //Show all the list when the sorting value is default
    return taskList;
  } else {
    //Return the task with the status matching with the sorting value
    return taskList.filter((task) => task.status === sortingOption);
  }
};
  return (
    <div className="container">
      <h1 className="mt-3 text-center">To-do App</h1>
      <div className="row">
        <div className="col-12">
          <TaskForm
            addTask={addTask}
            editedTask={editedTask}
            updateTask={updateTask}
            setEditedTask={setEditedTask}
          />
        </div>
      </div>
      <div className="row">
        <div className="mt-5">
          <h4>Task List</h4>

          <div className="col-lg-3 col-md-4 col-sm-6 my-3">
            <select className="form-select" id="sortingStatus" name="status" value={sortingOption} onChange={(event) => setSortingOption(event.target.value)}>
              <option value="default">Sorting By Status</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="review">Review</option>
            </select>
          </div>
          <table className="table">
            <thead>
              <tr className="table-primary">
                <th scope="col">ID</th>
                <th scope="col">Task Name</th>
                <th scope="col">Description</th>
                <th scope="col">Due Date</th>
                <th scope="col">Assign To</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {sortingTaskList().map((task, index) => {
                return (
                  <tr scope="row" key={index}>
                    <td>{task.id}</td>
                    <td>{task.name}</td>
                    <td>{task.description}</td>
                    <td>{task.dueDate}</td>
                    <td>{task.assignedTo}</td>
                    <td>{task.status}</td>
                    <td className="d-flex flex-column flex-sm-row">
                      <button
                        className="btn btn-warning m-2"
                        onClick={() => {
                          editTask(task);
                        }}
                      >
                        <i className="fa fa-edit"></i>
                      </button>
                      <button
                        className="btn btn-danger m-2"
                        onClick={() => deleteTask(task.id)}
                      >
                        <i className="fa fa-close"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ToDoApp;
