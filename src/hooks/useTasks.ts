import { useReducer, useEffect, useMemo } from 'react';
import { taskReducer, initialState } from '@/store/task.reducer';
import { storageService } from '@/services/storage.service';
import type { TaskFilter } from '@/core/task.entity';

export const useTasks = () => {
  // 1. Inicializamos el estado cargando desde el storage
  const [state, dispatch] = useReducer(taskReducer, initialState, (init) => {
    const savedTasks = storageService.load();
    return savedTasks.length > 0 ? { ...init, tasks: savedTasks } : init;
  });

  // 2. Sincronización automática: cada vez que tasks cambie, guardamos
  useEffect(() => {
    storageService.save(state.tasks);
  }, [state.tasks]);

  // 3. Estado derivado: Filtrado combinado
  const filteredTasks = useMemo(() => {
    return state.tasks.filter((task) => {
      // Primero aplicamos el filtro de estado
      const matchesFilter = 
        state.filter === 'all' || 
        (state.filter === 'pending' && !task.isCompleted) || 
        (state.filter === 'completed' && task.isCompleted);

      // Luego aplicamos el filtro de búsqueda
      const matchesSearch = (task.content || "") // Fallback por si content es undefined
        .toLowerCase()
        .includes((state.searchQuery || "").toString().toLowerCase()); // Forzamos a string

      return matchesFilter && matchesSearch;
    });
  }, [state.tasks, state.filter, state.searchQuery]);

  // Estadísticas memoizadas
  const stats = useMemo(() => ({
    total: state.tasks.length,
    pending: state.tasks.filter(t => !t.isCompleted).length,
    completed: state.tasks.filter(t => t.isCompleted).length
  }), [state.tasks]);

  // 4. API pública del Hook (Acciones simplificadas)
  const add = (content: string) => dispatch({ type: 'ADD_TASK', payload: content });
  const toggle = (id: string) => dispatch({ type: 'TOGGLE_TASK', payload: id });
  const remove = (id: string) => dispatch({ type: 'REMOVE_TASK', payload: id });
  const setFilter = (filter: TaskFilter) => dispatch({ type: 'SET_FILTER', payload: filter });
  const setSearchQuery = (query: string) => dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
  const clearCompleted = () => dispatch({ type: 'CLEAR_COMPLETED' });

  return {
    tasks: filteredTasks,
    filter: state.filter,
    searchQuery: state.searchQuery,
    stats,
    add,
    toggle,
    remove,
    setFilter,
    setSearchQuery,
    clearCompleted
  };
};
