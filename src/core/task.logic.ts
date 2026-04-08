import type { Task } from './task.entity';

/**
 * Fábrica de tareas. 
 * Valida reglas de negocio: no tareas vacías, no espacios extra.
 */
export const createTask = (content: string): Task => {
  const trimmedContent = content.trim();
  
  if (!trimmedContent) {
    throw new Error("El contenido de la tarea no puede estar vacío.");
  }

  return {
    id: crypto.randomUUID(), // Estándar moderno en navegadores y Node
    content: trimmedContent,
    isCompleted: false,
    createdAt: Date.now(),
  };
};

/**
 * Cambia el estado de completado.
 * Retorna una COPIA de la tarea con el valor invertido.
 */
export const toggleStatus = (task: Task): Task => ({
  ...task,
  isCompleted: !task.isCompleted,
  updatedAt: Date.now(),
});

/**
 * Actualiza el contenido de una tarea existente.
 */
export const updateContent = (task: Task, newContent: string): Task => {
  const trimmed = newContent.trim();
  
  if (!trimmed) return task; // Si está vacío, ignoramos el cambio

  return {
    ...task,
    content: trimmed,
    updatedAt: Date.now(),
  };
};