import { useState } from 'react';
import Todo from './Todo';
import TodoForm from './TodoForm';
import EditTodoForm from './EditTodoForm';
import './TodoWrapper.css';

type TodoItem = {
  title: string;
  description: string;
};

const TodoWrapper = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null); 
  // I need to store index of edited items because we need the editing form to show up for a specific index (the specific indivudally selected edited todo)

  const addTodo = (newTodo: TodoItem) => {
    setTodos([...todos, newTodo]);
  };

  // deletes a Todo by separating the currently selected index of an obect within the TodoItem array and placing it in it's own array, effectively deleting it
  const deleteTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  // uses the map function to replace the currently selected todo element within the Todoitems array with a newly updated todo provided via user input. setEditingIndex(null); stops the loop started by the map function
  const editTodo = (index: number, updatedTodo: TodoItem) => {
    setTodos(todos.map((todo, i) => (i === index ? updatedTodo : todo)));
    setEditingIndex(null);
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
  };

  return (
    <div className="card card-background">
      <h2 className="card-title">Todo List</h2>
      <TodoForm addTodo={addTodo} />
      {todos.map((todo, index) => (
        <div key={index}>
          {editingIndex === index ? (
            <EditTodoForm
              todo={todo}
              deleteTodo={() => deleteTodo(index)}
              editTodo={(updatedTodo) => editTodo(index, updatedTodo)}
              cancelEdit={handleCancelEdit}
            />
          ) : (
            // passing props to the Todo component
            <Todo 
              title={todo.title}
              description={todo.description}
              onDelete={() => deleteTodo(index)}
              onEdit={() => handleEdit(index)}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default TodoWrapper;
