import "./App.css";
import React, { useState } from "react";
import InputTodo from "./components/InputTodo";
import TodoList from "./components/TodoList";
import UserLogin from "./components/UserLogin";
// import axios from "axios";

// https://6311c36c19eb631f9d787866.mockapi.io/
// const apiHandler = (method, id, data) => {
//   axios({
//     method: method,
//     url: `https://630f989736e6a2a04eddd072.mockapi.io/todos/${id}`,
//     data: data,
//   }).then(res => setTodos(res)).catch((e) => {
//     console.log(e);
//   });
// };

function App() {
  const [todos, setTodos] = useState([]);

  const dataHandler = (data) => {
    setTodos((prevTodos) => {
      return [data, ...prevTodos];
    });
  };

  // useEffect(() => {
  //   axios.get('https://630f989736e6a2a04eddd072.mockapi.io/todos/9').then(res=>console.log(res.data));
  // }, []);

  return (
    <div className="App">
      <div className="main-card">
        <UserLogin/>
        <div className="card">
          <InputTodo onDataHandler={dataHandler} />
          <TodoList list={todos} setTodos={setTodos} />
        </div>
      </div>
    </div>
  );
}

export default App;
