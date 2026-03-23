/**
 * Representa la unidad mínima de información de nuestra app.
 * Usamos 'readonly' para asegurar que el estado solo cambie a través del Reducer.
 */
export interface Task {
  readonly id: string;
  readonly content: string;
  readonly isCompleted: boolean;
  readonly createdAt: number;
  readonly updatedAt?: number; // Opcional, para futuras ediciones
}

/**
 * Definimos los filtros posibles como un tipo de unión.
 * Esto evita errores de dedo como escribir 'complete' en lugar de 'completed'.
 */
export type TaskFilter = 'all' | 'pending' | 'completed';
