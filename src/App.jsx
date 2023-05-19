import { useEffect, useState } from "react";
import "./assets/styles.css";
import { NewTodoForm } from "./components/NewTodoForm";
import { TodoList } from "./components/TodoList";

export default function App() {
  //HOOKS AT THE TOP
  const [todos, setTodos] = useState(()=>{
    const localValue = localStorage.getItem("ITEM");
    return localValue ? JSON.parse(localValue) : [];
  });

  useEffect(()=>{
    localStorage.setItem("ITEM", JSON.stringify(todos));
  }, [todos])


// THEN HELPER FUNCTIONS
  function addTodo(title) {
    setTodos((currentTodos) => [
      ...todos,
      {
        id: crypto.randomUUID(),
        title,
        completed: false,
      },
    ]);
  }

  function toggleTodo(id, completed) {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed };
        }

        return todo;
      });
    });
  }

  function deleteTodo(id) {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== id);
    });
  }

  //FINALLY RETURN

  return (
    <>
      <NewTodoForm onSubmit={addTodo} />
      <h1 className="header">Todo List</h1>
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </>
  );
}
