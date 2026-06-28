import { useReducer, useEffect, useMemo } from 'react';
import { taskReducer, initialState } from '@/store/task.reducer';
import { storageService } from '@/services/storage.service';
import type { TaskFilter } from '@/core/task.entity';

export const useTasks = () => {

  // Initialize the state by loading from storage
  const [state, dispatch] = useReducer(taskReducer, initialState, (init) => {
    const savedTasks = storageService.load();
    return savedTasks.length > 0 ? { ...init, tasks: savedTasks } : init;
  });

  // Sync: change state and save
  useEffect(() => {
    storageService.save(state.tasks);
  }, [state.tasks]);

  // Derived state: Combined filtering
  const filteredTasks = useMemo(() => {

    // Pre-process the search only once for each query change.
    const cleanQuery = (state.searchQuery || '').toString().toLowerCase();
    const activeFilter = state.filter;

    return state.tasks.filter((task) => {

      // Filter
      const matchesFilter =
        activeFilter === 'all' ||
        (activeFilter === 'pending' && !task.isCompleted) ||
        (activeFilter === 'completed' && task.isCompleted);

      // Search filter (with cleanQuery)
      const matchesSearch = (task.content || '')
        .toLowerCase()
        .includes(cleanQuery);

      return matchesFilter && matchesSearch;
    });
  }, [state.tasks, state.filter, state.searchQuery]);

  // Statistics memo
  const stats = useMemo(
    () => ({
      total: state.tasks.length,
      pending: state.tasks.filter((t) => !t.isCompleted).length,
      completed: state.tasks.filter((t) => t.isCompleted).length,
    }),
    [state.tasks],
  );

  // Hook public API
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
