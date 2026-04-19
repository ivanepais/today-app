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
    // Pre-procesamos la búsqueda una sola vez por cada cambio de query
    const cleanQuery = (state.searchQuery || '').toString().toLowerCase();
    const activeFilter = state.filter;

    return state.tasks.filter((task) => {
      // 1. Filtro de estado (muy rápido, comparaciones simples)
      const matchesFilter =
        activeFilter === 'all' ||
        (activeFilter === 'pending' && !task.isCompleted) ||
        (activeFilter === 'completed' && task.isCompleted);

      // 2. Filtro de búsqueda (usamos cleanQuery ya procesada)
      const matchesSearch = (task.content || '')
        .toLowerCase()
        .includes(cleanQuery);

      return matchesFilter && matchesSearch;
    });
  }, [state.tasks, state.filter, state.searchQuery]);

  // Estadísticas memoizadas
  const stats = useMemo(
    () => ({
      total: state.tasks.length,
      pending: state.tasks.filter((t) => !t.isCompleted).length,
      completed: state.tasks.filter((t) => t.isCompleted).length,
    }),
    [state.tasks],
  );

  // 4. API pública del Hook (Acciones simplificadas)
  const add = (content: string) =>
    dispatch({ type: 'ADD_TASK', payload: content });
  const toggle = (id: string) => dispatch({ type: 'TOGGLE_TASK', payload: id });
  const remove = (id: string) => dispatch({ type: 'REMOVE_TASK', payload: id });
  const setFilter = (filter: TaskFilter) =>
    dispatch({ type: 'SET_FILTER', payload: filter });
  const setSearchQuery = (query: string) =>
    dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
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
    clearCompleted,
  };
};
