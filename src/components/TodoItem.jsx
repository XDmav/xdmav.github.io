import React from 'react';

function TodoItem({ todo, toggleTodo, removeTodo, filter }) {
    return (
        <div style={{display: (filter === "Checked" && !todo.completed) || (filter === "Unchecked" && todo.completed) ? 'none' : 'block'}}>
            <div className='item'>
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className='checkbox'
                />
                <span>{todo.title}</span>
                <button onClick={() => removeTodo(todo.id)}>Remove</button>
            </div>
        </div>
    );
}

export default TodoItem;