import { useState } from 'react';

function TodoApp() {
    const [tasks, setTasks] = useState([]);
    const [inputValue, setInputValue] = useState("");

    const handleAddTask = () => {
        if (!inputValue.trim()) return;
        setTasks([...tasks, { id: crypto.randomUUID(), text: inputValue, completed: false }]);
        setInputValue("");
    };

    const toggleTask = (id) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(t => t.id !== id));
    };

    const pendingTasks = tasks.filter(t => !t.completed).length;

    return (
        <div className="todo-app">
            <h1 className="todo-app__title">Mis Tareas</h1>

            <div className="todo-app__input-wrapper">
                <input
                    className="todo-app__input"
                    type="text"
                    placeholder="Escribe una tarea..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
                />
            </div>

            <div className="todo-list">
                {tasks.map(task => (
                    <div key={task.id} className="todo-item">
                        <input
                            type="checkbox"
                            id={task.id}
                            className="todo-item__checkbox"
                            checked={task.completed}
                            onChange={() => toggleTask(task.id)}
                        />
                        <label htmlFor={task.id} className="todo-item__label">
                            <span className="todo-item__text">{task.text}</span>
                        </label>
                        <button
                            className="todo-item__delete"
                            onClick={() => deleteTask(task.id)}
                            title="Eliminar tarea"
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>

            {tasks.length > 0 && (
                <footer className="todo-footer">
                    {pendingTasks} {pendingTasks === 1 ? 'tarea pendiente' : 'tareas pendientes'}
                </footer>
            )}
        </div>
    );
}

export default TodoApp;