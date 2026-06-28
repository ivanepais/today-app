import { describe, it, expect } from 'vitest';
import { taskReducer, initialState, TaskState } from './task.reducer';

describe('Task Reducer', () => {
  it('return to the default initial state', () => {
    
    // Send a non-existent action
    const result = taskReducer(initialState, {
      type: 'UNKNOWN',
    } as unknown as TaskAction);
    expect(result).toBe(initialState);
  });

  it('handle ADD_TASK by adding a new task', () => {
    const action = { type: 'ADD_TASK' as const, payload: 'Nueva Tarea' };

    const newState = taskReducer(initialState, action);

    expect(newState.tasks).toHaveLength(1);
    expect(newState.tasks[0].content).toBe('Nueva Tarea');
    expect(newState.tasks[0].isCompleted).toBe(false);
  });

  it('handle TOGGLE_TASK by changing the state of a task', () => {
    
    // Arrange: create a state with a previous task
    const stateWithTask: TaskState = {
      ...initialState,
      tasks: [
        {
          id: '123',
          content: 'Test',
          isCompleted: false,
          createdAt: Date.now(),
        },
      ],
    };
    const action = { type: 'TOGGLE_TASK' as const, payload: '123' };

    // Act
    const newState = taskReducer(stateWithTask, action);

    // Assert
    expect(newState.tasks[0].isCompleted).toBe(true);
    
    // Immutability
    expect(newState).not.toBe(stateWithTask);
    expect(newState.tasks).not.toBe(stateWithTask.tasks);
  });

  it('handle REMOVE_TASK removing the correct task', () => {
    
    // Arrange
    const stateWithTasks: TaskState = {
      ...initialState,
      tasks: [
        { id: '1', content: 'Eliminar', isCompleted: false, createdAt: 1 },
        { id: '2', content: 'Mantener', isCompleted: false, createdAt: 2 },
      ],
    };
    const action = { type: 'REMOVE_TASK' as const, payload: '1' };

    // Act
    const newState = taskReducer(stateWithTasks, action);

    // Assert
    expect(newState.tasks).toHaveLength(1);
    expect(newState.tasks[0].id).toBe('2');
    
    // Array immutability
    expect(newState.tasks).not.toBe(stateWithTasks.tasks);
  });

  it('handle SET_FILTER by updating the current filter', () => {
    const action = {
      type: 'SET_FILTER' as const,
      payload: 'completed' as const,
    };

    const newState = taskReducer(initialState, action);

    expect(newState.filter).toBe('completed');
  });

  it('back to "all" filter if the filter that is already active is selected.', () => {

     // Arrange: start in 'pending'
    const stateWithFilter: TaskState = {
      ...initialState,
      filter: 'pending',
    };

    const action = {
      type: 'SET_FILTER' as const,
      payload: 'pending' as const,
    };

    // Act
    const newState = taskReducer(stateWithFilter, action);

    // Assert: reducer turns it off and returns us to the origin.
    expect(newState.filter).toBe('all');
  });

  it('stay on "all" if "all" is selected while already on "all"', () => {
    const action = {
      type: 'SET_FILTER' as const,
      payload: 'all' as const,
    };

    const newState = taskReducer(initialState, action);

    expect(newState.filter).toBe('all');
  });

  it('handle GET_SEARCH_QUERY by updating the search text', () => {
    const action = {
      type: 'SET_SEARCH_QUERY' as const,
      payload: 'comprar pan',
    };

    const newState = taskReducer(initialState, action);

    expect(newState.searchQuery).toBe('comprar pan');
  });

  it('Handle CLEAR_COMPLETED by removing only completed tasks', () => {
    const stateWithMix: TaskState = {
      ...initialState,
      tasks: [
        { id: '1', content: 'Hecha', isCompleted: true, createdAt: 1 },
        { id: '2', content: 'Pendiente', isCompleted: false, createdAt: 2 },
      ],
    };

    const newState = taskReducer(stateWithMix, { type: 'CLEAR_COMPLETED' });

    expect(newState.tasks).toHaveLength(1);
    expect(newState.tasks[0].id).toBe('2');
  });
});
