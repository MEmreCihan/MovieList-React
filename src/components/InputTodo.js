import React, { useState } from "react";
import "./InputTodo.css";

function InputTodo(props) {
  const [content, setContent] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    if (content.length < 1) {
      console.log("Movie must be more than 1 character");
      setContent("");
    } else {
      const newTodo = {
        id: new Date().getTime(),
        content: content,
        isCompleted: false,
      };
      const td = props.onUploadMovie(newTodo)
      props.onDataHandler(await td);
      setContent("");
    }
  };
  return (
    <div className="input-todo">
      <div className="input-todo__header">
        <h1>Movies</h1>
      </div>
      <div className="input-todo__form">
        <form onSubmit={submitHandler}>
          <input
            type="text"
            onChange={(e) => setContent(e.target.value)}
            value={content}
            placeholder="Add Movie"
          />
          <button type="submit" className="button-29">
            Add
          </button>
        </form>
      </div>
    </div>
  );
}

export default InputTodo;
