import { useState, useEffect } from 'react';
import axios from 'axios';


function App() {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await axios.get('http://localhost:5000/api/todos');
    setTodos(response.data);
  };

  const addTodo = async () => {
    if (task.trim() === '') return;

    await axios.post('http://localhost:5000/api/todos', { task });
    setTask('');
    fetchTodos();
  };

  const completeTodo = async (id) => {
    await axios.put(`http://localhost:5000/api/todos'${id}`);
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:5000/api/todos'${id}`);
    fetchTodos();
  };

  return (
    <div className="App">
      <h1>Lista de Tareas</h1>
      <div>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Nueva tarea"
        />
        <button onClick={addTodo}>Agregar</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            <span
              className={todo.completed ? 'completed' : ''}
              onClick={() => completeTodo(todo._id)}
            >
              {todo.task}
            </span>
            <button onClick={() => deleteTodo(todo._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
