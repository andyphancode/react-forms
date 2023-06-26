import React, { useState } from "react";

const Todo = ({ task = "example task", id="1", remove, update}) => {
    const [editTask, setEditTask] = useState(task);
    const [isEditing, setIsEditing] = useState(false);

    const handleChange = evt => {
        setEditTask(evt.target.value);
    }

    const handleDelete = () => remove(id);

    const handleUpdate = evt => {
        evt.preventDefault();
        update(id, editTask);
        setIsEditing(false);
    };

    const toggleEdit = () => {
        setIsEditing(edit => !edit);
    };

    let taskHTML = (
        <div>
            <li>{task}</li>
            <button onClick={toggleEdit}>Edit</button>
            <button onClick={handleDelete}>X</button>
        </div>
    );

    if (isEditing) {
        taskHTML = (
            <div>
                <form onSubmit={handleUpdate}>
                    <input type="text" value={editTask} onChange={handleChange} />
                    <button>Update</button>
                </form>
            </div>
        );
    }

    return taskHTML;

}

export default Todo;