import React, { useState } from "react";
import "./InputTodo.css";

function InputTodo(props) {
  const [content, setContent] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if(content.length < 0) {
      setContent("");
    }else {
      const newTodo = {
        id: new Date().getTime(),
        content: content,
        isCompleted: false,
      };
  
      props.onDataHandler(newTodo);
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
            <button type="submit" className="button-29">Add</button>
        </form>
      </div>
    </div>
  );
}

export default InputTodo;
