import axios from "axios";
import React from "react";
import { useState } from "react";
import "./singleItem.css";

const SingleItem = (item) => {
  const [name, setName] = useState(item.props.task);
  const [editToggle, setEditToggel] = useState(false);

  async function handleDelete(id) {
    await axios.delete(`http://localhost:5000/api/delete/${id}`);
  }

  async function handleUpdate(id) {
    await axios.put(`http://localhost:5000/api/update/${id}`, { task: name });
  }

  function edit() {
    if (editToggle === true) {
      handleUpdate(item.props._id);
    }
    setEditToggel(!editToggle);
  }

  return (
    <>
      <div className="block">
        {editToggle === true ? (
          <>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </>
        ) : (
          <>
            <h3>{item.props.task}</h3>
            <button
              className="btn"
              onClick={() => handleDelete(item.props._id)}
            >
              Delete
            </button>
          </>
        )}
        <button className="btn-edit" onClick={() => edit()}>
          Edit
        </button>
      </div>
    </>
  );
};

export default SingleItem;
