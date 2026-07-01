import { describe, it, expect, vi, beforeEach } from 'vitest';
import { storageService } from './storage.service';
import type { Task } from '@/core/task.entity';

describe('Storage Service', () => {
  beforeEach(() => {
    localStorage.clear();
    
    // Clean spys
    vi.clearAllMocks();
  });

  it('save tasks as a JSON string', () => {
    const mockTasks: Partial<Task>[] = [{ id: '1', content: 'Test' }];
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

    storageService.save(mockTasks as Task[]);

    expect(setItemSpy).toHaveBeenCalledWith(
      'v1_tasks_data',
      JSON.stringify(mockTasks),
    );
  });

  it('return an empty array if localStorage is empty', () => {
    const tasks = storageService.load();
    expect(tasks).toEqual([]);
  });

  it('handle corrupted JSON gracefully', () => {
    localStorage.setItem('v1_tasks_data', '{ corrupted [');
    const tasks = storageService.load();
    
    // Cache saves us
    expect(tasks).toEqual([]);
  });
});
