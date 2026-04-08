import type { Task, TaskFilter } from '@/core/task.entity';
import * as TaskLogic from '@/core/task.logic';

// Definimos el estado global de esta característica
export interface TaskState {
  tasks: Task[];
  filter: TaskFilter;
}

// Discriminante de acciones: El compilador sabrá qué payload tiene cada una
export type TaskAction =
  | { type: 'ADD_TASK'; payload: string }
  | { type: 'TOGGLE_TASK'; payload: string }
  | { type: 'REMOVE_TASK'; payload: string }
  | { type: 'SET_FILTER'; payload: TaskFilter }
  | { type: 'CLEAR_COMPLETED' };

  export const initialState: TaskState = {
  tasks: [],
  filter: 'all',
};

export const taskReducer = (state: TaskState, action: TaskAction): TaskState => {
  switch (action.type) {
    case 'ADD_TASK':
      // Usamos nuestra lógica de dominio testeada
      return {
        ...state,
        tasks: [...state.tasks, TaskLogic.createTask(action.payload)],
      };

    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.payload ? TaskLogic.toggleStatus(t) : t
        ),
      };

    case 'REMOVE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter((t) => t.id !== action.payload),
      };

    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload,
      };

    case 'CLEAR_COMPLETED':
      return {
        ...state,
        tasks: state.tasks.filter((t) => !t.isCompleted),
      };

    default:
      return state;
  }
};