
/*
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

*/

import { useMemo } from 'react';
import { useTasks } from '../../../hooks/useTasks';
import { DashboardTemplate } from '../../templates/DashboardTemplate/DashboardTemplate';
import { TodoTemplate } from '../../templates/TodoTemplate/TodoTemplate';
import { FilterPanel } from '../../organisms/FilterPanel/FilterPanel';
import { TodoList } from '../../organisms/TodoList/TodoList';
import { TodoInput } from '../../molecules/TodoInput/TodoInput';
import { Typography } from '../../atoms/Typography/Typography';
import { Button } from '../../atoms/Button/Button'; // Asumiendo que tienes este átomo

export const TodoPage = () => {
  const { 
    tasks, add, toggle, remove, 
    filter, setFilter, stats, clearCompleted 
  } = useTasks();

  // 1. Mapeamos las stats al formato que espera el FilterPanel
  const categories = useMemo(() => [
    { id: 'all', label: 'Todas', count: stats.total },
    { id: 'pending', label: 'Pendientes', count: stats.pending },
    { id: 'completed', label: 'Completadas', count: stats.completed },
  ], [stats]);

  return (
    <DashboardTemplate
      header={
        <Typography variant="h2" color="white">Liquid Task</Typography>
      }
      sidebar={
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
          <FilterPanel 
            categories={categories}
            selectedIds={[filter]}
            onToggleCategory={(id) => setFilter(id as any)}
            title="Categorías"
          />
          
          {/* Bonus: Limpiar completadas al final del sidebar */}
          {stats.completed > 0 && (
            <Button 
              variant="secondary" 
              onClick={clearCompleted}
              style={{ margin: '20px' }}
            >
              Borrar completadas ({stats.completed})
            </Button>
          )}
        </div>
      }
    >
      {/* El contenido principal usa el TodoTemplate para el layout interno */}
      <TodoTemplate
        header={
          <div style={{ marginBottom: '1rem' }}>
            <Typography variant="h1">
              {filter === 'all' ? 'Mis Tareas' : filter === 'pending' ? 'Pendientes' : 'Completadas'}
            </Typography>
            <Typography variant="body" color="textSecondary">
              Tienes {stats.pending} asuntos por resolver hoy.
            </Typography>
          </div>
        }
        inputSlot={
          <TodoInput onAdd={add} />
        }
        listSlot={
          <TodoList 
            todos={tasks} 
            onToggleTodo={toggle} 
            onDeleteTodo={remove} 
          />
        }
      />
    </DashboardTemplate>
  );
};