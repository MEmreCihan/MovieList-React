import React,{useState} from "react";
import "./TodoList.css";
// import 'bootstrap/dist/css/bootstrap.css';
import { AiFillDelete } from "react-icons/ai";

function TodoList(props) {
  const [clickedForEdit, setClickedForEdit] = useState(null);
  const [updateData, setUpdateData] = useState({
    id:null,
    content:null
  })

  function deleteTodo (id) {
    // props.setTodos(props.list.filter((element) => element.id !== id));
    fetch(
      `https://6311c36c19eb631f9d787866.mockapi.io/todos/${id}`,
      {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        },
      }
    );
    return props.setTodos(props.list.filter((element) => element.id !== id));
  };

  const checked = (obj) => {
    fetch(`https://6311c36c19eb631f9d787866.mockapi.io/todos/${obj.id}`, {
      method: "PUT",
      body: JSON.stringify({ isCompleted: !obj.isCompleted}),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return props.setTodos(
      props.list.map((item) => {
        return {
          id: item.id,
          content: item.content,
          isCompleted:
            item.id === Number(obj.id) ? !item.isCompleted : item.isCompleted,
        };
      })
    );
  };

  const focusFunction =(id) => {
    setClickedForEdit(id);
    setUpdateData(() => ({
      id,
      content: props.list.find(x => x.id === id).content
    }))
  }

  const saveHandler = (obj) => {
    props.setTodos(
      props.list.map((item) => {
        return {
          id: item.id,
          content: item.id === Number(obj.id) ? updateData.content : item.content,
          isCompleted: item.isCompleted,
        };
      })
    );
    fetch(`https://6311c36c19eb631f9d787866.mockapi.io/todos/${obj.id}`, {
      method: "PUT",
      body: JSON.stringify({ content: updateData.content}),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(x => console.log(x));
    setClickedForEdit(false);
  }

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
              onClick={()=>checked(obj)}
              id={obj.id}
            />
            <input
              className="toggle"
              defaultValue={obj.content}
              onFocus={() => focusFunction(obj.id)}
              onInput={(e) => {
                setUpdateData((c) => ({
                  ...c,
                  content: e.target.value
                }))
              }}
              id={obj.id}
            />
            {clickedForEdit === obj.id && <button onClick={()=> saveHandler(obj)} className="button-29">Save</button>}
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
