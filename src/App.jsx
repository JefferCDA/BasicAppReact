import React, { Fragment, useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Todolist } from "./components/Todolist";

const KEY = "todoApp.todo";

export function App() {
  const [todos, setTodos] = useState([
    { id: 1, task: "Tarea 1", completed: false },
  ]);
  const todoTaskRef = useRef();

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(KEY));

    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  const toggleTodo = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.completed = !todo.completed;
    setTodos(newTodos);
  };

  const handledTodoAdd = () => {
    const task = todoTaskRef.current.value;
    if (task === "") return;

    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), task, completed: false }];
    });
    todoTaskRef.current.value = null;
  };

  const handleClearCompleted = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
  };

  return (
    <Fragment>
      <input
        ref={todoTaskRef}
        type="text"
        name=""
        id=""
        placeholder="nueva tarea"
      />
      <button onClick={handledTodoAdd}>Agregar</button>
      <button onClick={handleClearCompleted}>Eliminar</button>
      <Todolist todos={todos} toggleTodo={toggleTodo} />
      <div>
        Te quedan {todos.filter((todo) => !todo.completed).length} Tareas por
        terminar
      </div>
    </Fragment>
  );
}
