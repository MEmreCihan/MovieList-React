import "./App.css";
import React, { useState, useEffect } from "react";
import InputTodo from "./components/InputTodo";
import TodoList from "./components/TodoList";
import UserLogin from "./components/UserLogin";
// import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(()=>{
    getMoviesFromApi();
  },[])

  const dataHandler = (data) => {
    setTodos((prevTodos) => {
      return [data, ...prevTodos];
    });
  };

  async function getMoviesFromApi() {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://6311c36c19eb631f9d787866.mockapi.io/todos"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();

      const apiMovies = data.map((movieData) => {
        return {
          id: movieData.id,
          content: movieData.content,
          isCompleted: movieData.isCompleted,
        };
      }).sort((a,b) => b.id - a.id);
      setTodos(apiMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }

  async function addMovieToApi(item) {
    setIsLoading(true);
    const obj = {
      content: item.content,
      isCompleted: false,
      id: item.id
    }
    const response = await fetch(
      "https://6311c36c19eb631f9d787866.mockapi.io/todos",
      {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
          'Content-Type': 'application/json'
        },
      }
    );
    const data = await response.json();
    setIsLoading(false);
    return data;
  }

  let content = <p>Found no movies!</p>;

  if (todos.length > 0) {
    content = <TodoList list={todos} setTodos={setTodos} />;
  }
  if (error) {
    content = <p>{error}</p>;
  }
  if (isLoading) {
    content = <p>Loading..</p>;
  }

  return (
    <div className="App">
      <div className="main-card">
        <UserLogin />
        <div className="card">
          <InputTodo onDataHandler={dataHandler} onUploadMovie={addMovieToApi}/>
          <button onClick={getMoviesFromApi} className="button-28">
            Get Movies
          </button>
          {content}
        </div>
      </div>
    </div>
  );
}

export default App;
