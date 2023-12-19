import React, { useEffect, useState, Component } from "react";

const TaskForm = (props) => {
  const { addTask, editedTask, updateTask, setEditedTask } = props;
  //define state for the field
  const [task, setTask] = useState({
    id: "",
    name: "",
    description: "",
    dueDate: "",
    assignedTo: "",
    status: "default",
  });

  const [error, setError] = useState({
    id: "",
    name: "",
    description: "",
    dueDate: "",
    assignedTo: "",
    status: "default",
  });

  useEffect(() => {
    console.log(task);
  }, [task]);

  useEffect(() => {
    
    if (editedTask) {
      setTask(editedTask);
    }
  }, [editedTask]);

  const handleInputChange = (name) => {
    return (event) => {
      setTask({
        ...task,
        [name]: event.target.value,
      });
      console.log("form value", task);
    };
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (editedTask) {
      updateTask(task)
    }
    else {
      addTask(task)
    }
    setTask({
          id: '',
          name: '',
          description: '',
          dueDate: '',
          assignedTo: '',
          status: 'default'
        })
    setEditedTask(undefined)
  };

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-9"></div>
        <div className="col-3">
          <select className="form-select" id="sortingStatus" name="status">
            <option value="default">Sorting By Status</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="review">Review</option>
          </select>
        </div>
      </div>
      <h6></h6>
      <form className="mt-3" onSubmit={handleFormSubmit}>
        <div className="row">
          <div className="col-6 mb-3">
            <label htmlFor="name" className="form-label">
              Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={task.name}
              onChange={handleInputChange("name")}
            />
          </div>

          <div className="col-6 mb-3">
            <label htmlFor="description" className="form-label">
              Description:
            </label>
            <input
              className="form-control"
              id="description"
              name="description"
              value={task.description}
              onChange={handleInputChange("description")}
            />
          </div>

          <div className="col-6 mb-3">
            <label htmlFor="dueDate" className="form-label">
              Due Date:
            </label>
            <input
              type="date"
              className="form-control"
              id="dueDate"
              name="dueDate"
              value={task.dueDate}
              onChange={handleInputChange("dueDate")}
            />
          </div>

          <div className="col-6 mb-3">
            <label htmlFor="assignedTo" className="form-label">
              Assigned To:
            </label>
            <input
              type="text"
              className="form-control"
              id="assignedTo"
              name="assignedTo"
              value={task.assignedTo}
              onChange={handleInputChange("assignedTo")}
            />
          </div>

          <div className="col-6 mb-3">
            <label htmlFor="status" className="form-label">
              Status:
            </label>
            <select
              className="form-select"
              id="status"
              name="status"
              value={task.status}
              onChange={handleInputChange("status")}
            >
              <option value="default">Choose a status</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="review">Review</option>
            </select>
          </div>
        </div>

        <div className="">
            {
              editedTask? (<button
                id="updateBtn"
                  className="btn btn-info mx-2"
                  onClick={() => {
                    updateTask(task) 
                  }}
                >
                  Update
                </button>) : (<button className="btn btn-primary" id="addBtn">
              Add Task
            </button>)
            }
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
