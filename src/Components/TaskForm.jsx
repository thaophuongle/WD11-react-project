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

  // const [error, setError] = useState({
  //   id: "",
  //   name: "",
  //   description: "",
  //   dueDate: "",
  //   assignedTo: "",
  //   status: "default",
  // });
  const [userArray, setUserArray] = useState([]);

  //fetch the data from API endpoint
  useEffect(() => {
    fetch('https://onlineprojectsgit.github.io/API/WDEndpoint.json')
      .then((response) => response.json())
      .then((data) => {
        setUserArray(data.info.learners);
        //console.log('userArray', userArray)
      }).catch(err => console.log(err));
  }, []);

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
    //prevent browser from reloading
    event.preventDefault();

    //if editedTask exists update the task, if not add the new task
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
      
    //reset the editedTask after adding or updating the new task
    setEditedTask(undefined)
  };

  return (
    <div className="mt-3">
      <form className="col-lg-12 col-md-12 col-sm-12" onSubmit={handleFormSubmit}>
        <div className="row">
          <div className="col-lg-6 col-md-6 mb-3">
            <label htmlFor="name" className="form-label">
              Task Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={task.name}
              onChange={handleInputChange("name")}
              required
            />
          </div>

          <div className="col-lg-6 col-md-6 mb-3">
            <label htmlFor="description" className="form-label">
              Description:
            </label>
            <input
              className="form-control"
              id="description"
              name="description"
              value={task.description}
              onChange={handleInputChange("description")}
              required
            />
          </div>

          <div className="col-lg-6 col-md-6 mb-3">
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
              required
            />
          </div>

          <div className="col-lg-6 col-md-6 mb-3">
            <label htmlFor="assignedTo" className="form-label">
              Assigned To:
            </label>
            <select
              className="form-control"
              id="assignedTo"
              name="assignedTo"
              value={task.assignedTo}
              onChange={handleInputChange("assignedTo")}
              required
            >
              {
                userArray.map((userName) => {
                  return <option key={userName} value={userName}>{userName}</option>
                })
              }
            </select>
          </div>

          <div className="col-lg-6 col-md-6 mb-3">
            <label htmlFor="status" className="form-label">
              Status:
            </label>
            <select
              className="form-select"
              id="status"
              name="status"
              value={task.status}
              onChange={handleInputChange("status")}
              required
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
