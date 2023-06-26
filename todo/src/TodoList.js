import React, { useState } from "react";
import Todo from "./Todo";
import NewTodoForm from "./NewTodoForm";

const TodoList = () => {

    const [todos, setTodos] = useState([]);

    // add todo
    const create = newTodo => {
        setTodos(todos => [...todos, newTodo]);
    }

    // remove todo
    const remove = id => {
        setTodos(todos => todos.filter(todo => todo.id !== id));
    }

    // update todo
    const update = (id, updatedTodo) => {
        setTodos(todos => todos.map(todo => todo.id === id ? { ...todo, task: updatedTodo } : todo ));
    }

    const todoComponents = todos.map(todo => (
        <Todo
            key={todo.id}
            id={todo.id}
            task={todo.task}
            remove={remove}
            update={update}
        />
    ));

    return (
        <div className="TodoList">
            <NewTodoForm createTodo={create}/>
            <ul>{todoComponents}</ul>
        </div>
    )



}

export default TodoList;
