import React, { useState } from 'react'

const TaskList = () => {
  return (
    <div className='mt-5'>
      <h4>Task List</h4>
      <table className='table'>
      <thead>
    <tr className='table-primary'>
      <th scope="col">Name</th>
      <th scope="col">Description</th>
      <th scope="col">Due Date</th>
      <th scope="col">Assign To</th>
      <th scope="col">Status</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
        <tbody>
          <tr scope="row">
            <td>Task 1</td>
            <td>Lorem ipsum dolor sit amet, consectetur adipisicing.</td>
            <td>15/12/2023</td>
            <td>Team member 1</td>
            <td>In-progress</td>
            <td>
              <button className='btn btn-warning'>Edit</button>
              <button className='btn btn-danger mx-2'>Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default TaskList