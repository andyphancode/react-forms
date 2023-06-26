import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const NewTodoForm = ({ createTodo }) => {
    const [task, setTask] = useState("");

    const handleChange = evt => {
        setTask(evt.target.value);
    }

    const compileInput = evt => {
        evt.preventDefault();
        createTodo({ task, id: uuidv4() });
        setTask("");
    }

    return (
        <div>
            <form onSubmit={compileInput}>
                <label htmlFor="task">Task:</label>
                <input
                    id="task"
                    name="task"
                    type="task"
                    onChange={handleChange}
                    value={task}
                />
                <button>Add todo!</button>
            </form>
        </div>
    );
}

export default NewTodoForm;