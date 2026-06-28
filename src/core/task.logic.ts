import type { Task } from './task.entity';

// Task Factory: business rules: no empty tasks, no extra spaces
export const createTask = (content: string): Task => {
  const trimmedContent = content.trim();

  if (!trimmedContent) {
    throw new Error('El contenido de la tarea no puede estar vacío.');
  }

  return {
    id: crypto.randomUUID(),
    content: trimmedContent,
    isCompleted: false,
    createdAt: Date.now(),
  };
};

// Change completed state.
// Return copy, value reversed.
export const toggleStatus = (task: Task): Task => ({
  ...task,
  isCompleted: !task.isCompleted,
  updatedAt: Date.now(),
});

// Update content if task exist
export const updateContent = (task: Task, newContent: string): Task => {
  const trimmed = newContent.trim();

  // If it's empty, ignore change
  if (!trimmed) return task;

  return {
    ...task,
    content: trimmed,
    updatedAt: Date.now(),
  };
};
