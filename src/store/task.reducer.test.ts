import { describe, it, expect } from 'vitest';
import { taskReducer, initialState, TaskState } from './task.reducer';

describe('Task Reducer', () => {
  it('debería retornar el estado inicial por defecto', () => {
    // Enviamos una acción inexistente
    const result = taskReducer(initialState, {
      type: 'UNKNOWN',
    } as unknown as TaskAction);
    expect(result).toBe(initialState);
  });

  it('debería manejar ADD_TASK añadiendo una nueva tarea', () => {
    const action = { type: 'ADD_TASK' as const, payload: 'Nueva Tarea' };

    const newState = taskReducer(initialState, action);

    expect(newState.tasks).toHaveLength(1);
    expect(newState.tasks[0].content).toBe('Nueva Tarea');
    expect(newState.tasks[0].isCompleted).toBe(false);
  });

  it('debería manejar TOGGLE_TASK cambiando el estado de una tarea', () => {
    // Arrange: Creamos un estado con una tarea previa
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
    // Verificamos inmutabilidad
    expect(newState).not.toBe(stateWithTask);
    expect(newState.tasks).not.toBe(stateWithTask.tasks);
  });

  it('debería manejar REMOVE_TASK eliminando la tarea correcta', () => {
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
    // Verificamos inmutabilidad del array
    expect(newState.tasks).not.toBe(stateWithTasks.tasks);
  });

  it('debería manejar SET_FILTER actualizando el filtro actual', () => {
    const action = {
      type: 'SET_FILTER' as const,
      payload: 'completed' as const,
    };

    const newState = taskReducer(initialState, action);

    expect(newState.filter).toBe('completed');
  });

  it('debería volver al filtro "all" si se selecciona el filtro que ya está activo', () => {
    /**
     * Arrange: Partimos de un estado donde el filtro ya es 'pending'
     */
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

    /**
     * Assert: Al ser el mismo, el reducer debe "apagarlo"
     * y devolvernos al origen ('all')
     */
    expect(newState.filter).toBe('all');
  });

  it('debería mantenerse en "all" si se selecciona "all" estando ya en "all"', () => {
    const action = {
      type: 'SET_FILTER' as const,
      payload: 'all' as const,
    };

    const newState = taskReducer(initialState, action);

    expect(newState.filter).toBe('all');
  });

  it('debería manejar SET_SEARCH_QUERY actualizando el texto de búsqueda', () => {
    const action = {
      type: 'SET_SEARCH_QUERY' as const,
      payload: 'comprar pan',
    };

    const newState = taskReducer(initialState, action);

    expect(newState.searchQuery).toBe('comprar pan');
  });

  it('debería manejar CLEAR_COMPLETED eliminando solo las tareas hechas', () => {
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
