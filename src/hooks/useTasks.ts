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

  // 3. Estado derivado (Calculado eficientemente)
  const filteredTasks = useMemo(() => {
    switch (state.filter) {
      case 'pending': return state.tasks.filter(t => !t.isCompleted);
      case 'completed': return state.tasks.filter(t => t.isCompleted);
      default: return state.tasks;
    }
  }, [state.tasks, state.filter]);

  const stats = {
    total: state.tasks.length,
    pending: state.tasks.filter(t => !t.isCompleted).length,
    completed: state.tasks.filter(t => t.isCompleted).length
  };

  // 4. API pública del Hook (Acciones simplificadas)
  const add = (content: string) => dispatch({ type: 'ADD_TASK', payload: content });
  const toggle = (id: string) => dispatch({ type: 'TOGGLE_TASK', payload: id });
  const remove = (id: string) => dispatch({ type: 'REMOVE_TASK', payload: id });
  const setFilter = (filter: TaskFilter) => dispatch({ type: 'SET_FILTER', payload: filter });
  const clearCompleted = () => dispatch({ type: 'CLEAR_COMPLETED' });

  return {
    tasks: filteredTasks,
    filter: state.filter,
    stats,
    add,
    toggle,
    remove,
    setFilter,
    clearCompleted
  };
};
