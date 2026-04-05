import { useState, useEffect } from 'react';
import { TodoTemplate } from '../../templates/TodoTemplate/TodoTemplate';
import { TodoList } from '../../organisms/TodoList/TodoList';
import { TodoInput } from '../../molecules/TodoInput/TodoInput';
import { Typography } from '../../atoms/Typography/Typography';
import { StyledPage } from './TodoPage.styles';

// Definimos la forma de nuestra tarea
interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export const TodoPage = () => {
  // Estado inicial: Intentamos cargar de LocalStorage o empezamos con un array vacío
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('liquid-glass-todos');
    return saved ? JSON.parse(saved) : [];
  });

  // Guardar en LocalStorage cada vez que cambien los todos
  useEffect(() => {
    localStorage.setItem('liquid-glass-todos', JSON.stringify(todos));
  }, [todos]);

  // --- HANDLERS ---
  
  const handleAddTodo = (text: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(), // Generador de ID nativo del navegador
      text,
      completed: false,
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const handleToggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleFieldDelete = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <StyledPage>
      <TodoTemplate
        header={
          <>
            <Typography variant="h1">Liquid Task</Typography>
            <Typography variant="body" color="textSecondary">
              Organiza tu día con estilo minimalista
            </Typography>
          </>
        }
        inputSlot={
          <TodoInput onAdd={handleAddTodo} />
        }
        listSlot={
          <TodoList 
            todos={todos} 
            onToggleTodo={handleToggleTodo} 
            onDeleteTodo={handleFieldDelete} 
          />
        }
      />
    </StyledPage>
  );
};