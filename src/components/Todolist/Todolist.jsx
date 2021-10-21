import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import SingleItem from "../SingleItem/SingleItem";

export default function Todolist() {
  const [task, setTask] = useState("");
  const [todo, setTodo] = useState([]);

  useEffect(() => {
    addItem();
  }, [todo]);

  async function addItem() {
    axios
      .get("http://localhost:5000/api/todo")
      .then((Data) => {
        setTodo(Data.data);
      })
      .catch((err) => console.log("error =" + err));
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    await axios.post("http://localhost:5000/api", { task: task });
    setTask("");
  }

  return (
    <>
      <div>
        <form>
          <label htmlFor="task">Task : </label>
          <input
            type="text"
            id="task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button onClick={handleSubmit}>Add</button>
        </form>
      </div>
      <div>
        {todo.map((item) => {
          return <SingleItem props={item} key={item._id} />;
        })}
      </div>
    </>
  );
}
