// readonly: state changes through the Reducer.
export interface Task {
  readonly id: string;
  readonly content: string;
  readonly isCompleted: boolean;
  readonly createdAt?: number;
  readonly updatedAt?: number;
}

// Union type: avoids typing errors.
export type TaskFilter = 'all' | 'pending' | 'completed';
