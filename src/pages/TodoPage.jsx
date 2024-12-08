import React, { useState } from 'react';
import TodoList from '../components/TodoList';
import { useNavigate } from 'react-router-dom';

function App() {
    const [todos, setTodos] = useState([
        { id: 1, title: 'Buy groceries', completed: false },
        { id: 2, title: 'Read a book', completed: false },
    ]);
    const [newTodo, setNewTodo] = useState('');
    const [filter, setfilter] = useState("All");

    const toggleTodo = (id) => {
        setTodos(
            todos.map((todo) => todo.id === id ? { ...todo, completed: !todo.completed } : todo)
        );
    };

    const removeTodo = (id) => {
        setTodos(
            todos.filter((todo) => todo.id !== id)
        );
    };

    const addTodo = (e) => {
        e.preventDefault();
        if (!newTodo) return;

        const newTodoItem = {
            id: Date.now(),
            title: newTodo,
            completed: false,
        };
        setTodos([...todos, newTodoItem]);
        setNewTodo('');
    };

    let nav = useNavigate();
    const redir = () => {
        nav("/dnd")
    }

    return (
        <div>
            <button onClick={redir}>Другая страница</button>
            <h1>My To-Do List</h1>
            <form onSubmit={addTodo}>
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Add new task..."
                />
                <button type="submit">Add</button>
            </form>
            <div className='filters'>
                <button className={filter === "All" ? 'active' : ''} onClick={() => setfilter("All")}>All</button>
                <button className={filter === "Checked" ? 'active' : ''} onClick={() => setfilter("Checked")}>Checked</button>
                <button className={filter === "Unchecked" ? 'active' : ''} onClick={() => setfilter("Unchecked")}>Unchecked</button>
            </div>
            <TodoList todos={todos} toggleTodo={toggleTodo} removeTodo={removeTodo} filter={filter} />
        </div>
    );
}

export default App;