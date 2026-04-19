import type { Task } from '@/core/task.entity';

const STORAGE_KEY = 'v1_tasks_data';

export const storageService = {
  save: (tasks: Task[]): void => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error('Error saving to localStorage', error);
    }
  },

  load: (): Task[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading from localStorage', error);
      return [];
    }
  },
};
