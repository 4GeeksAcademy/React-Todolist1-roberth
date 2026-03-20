import { useState } from 'react';

function TodoApp() {
    const [tareas, setTareas] = useState([]);
    const [valorInput, setValorInput] = useState("");

    const agregarTarea = () => {
        if (!valorInput.trim()) return;
        setTareas([...tareas, { id: crypto.randomUUID(), texto: valorInput, completada: false }]);
        setValorInput("");
    };

    const alternarTarea = (id) => {
        setTareas(tareas.map(t => t.id === id ? { ...t, completada: !t.completada } : t));
    };

    const eliminarTarea = (id) => {
        setTareas(tareas.filter(t => t.id !== id));
    };

    const pendientes = tareas.filter(t => !t.completada).length;

    return (
        <div className="app">
            <h1 className="titulo">Mis Tareas</h1>

            <div className="campo">
                <input
                    className="entrada"
                    type="text"
                    placeholder="Escribe una tarea..."
                    value={valorInput}
                    onChange={(e) => setValorInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && agregarTarea()}
                />
            </div>

            <div className="lista">
                {tareas.map(tarea => (
                    <div key={tarea.id} className="item">
                        <input
                            type="checkbox"
                            id={tarea.id}
                            className="check"
                            checked={tarea.completada}
                            onChange={() => alternarTarea(tarea.id)}
                        />
                        <label htmlFor={tarea.id} className="etiqueta">
                            <span className="texto">{tarea.texto}</span>
                        </label>
                        <button
                            className="borrar"
                            onClick={() => eliminarTarea(tarea.id)}
                            title="Eliminar"
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>

            {tareas.length > 0 && (
                <footer className="pie">
                    {pendientes} {pendientes === 1 ? 'tarea pendiente' : 'tareas pendientes'}
                </footer>
            )}
        </div>
    );
}

export default TodoApp;