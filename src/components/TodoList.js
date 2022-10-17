import React, { useState } from "react";
import "./TodoList.css";
// import 'bootstrap/dist/css/bootstrap.css';
import { AiFillDelete } from "react-icons/ai";

function TodoList(props) {
  const deleteTodo = (id) => {
    props.setTodos(props.list.filter((element) => element.id !== id));
  };

  const editTodo = (e) => {
    let id = e.target.id;
    props.setTodos(
      props.list.map((item) => {
        return {
          id: item.id,
          content: item.id === Number(id) ? e.target.value : item.content,
          isCompleted: item.isCompleted === false ? false : true,
        };
      })
    );
  };

  const checked = (e) => {
    let id = e.target.id;
    props.setTodos(
      props.list.map((item) => {
        return {
          id: item.id,
          content: item.content,
          isCompleted:
            item.id === Number(id) ? !item.isCompleted : item.isCompleted,
        };
      })
    );
    console.log(props.list);
  };

  return (
    <div className="todo-list">
      <ul className="list-group">
        {props.list.map((obj) => (
          <li className="list-group-item" key={obj.id}>
            <input
              className="check-box"
              defaultChecked={obj.isCompleted}
              type="checkBox"
              size="2em"
              onClick={checked}
              id={obj.id}
            />
            <input
              className="toggle"
              value={obj.content}
              onChange={editTodo}
              id={obj.id}
            />
            <i onClick={() => deleteTodo(obj.id)} className="delete-button">
              <AiFillDelete size="1.8em" className="aifilldelete" />
            </i>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
