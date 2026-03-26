import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useTasks } from './useTasks';
import { storageService } from '@/services/storage.service';

// Mockeamos el servicio de storage
vi.mock('@/services/storage.service', () => ({
  storageService: {
    load: vi.fn(() => []),
    save: vi.fn(),
  },
}));

describe('useTasks Hook', () => {
  it('should add a task and trigger storage save', () => {
    const { result } = renderHook(() => useTasks());

    // En React, los cambios de estado en tests deben ir envueltos en act()
    act(() => {
      result.current.add('Nueva tarea desde Hook');
    });

    expect(result.current.tasks).toHaveLength(1);
    expect(result.current.tasks[0].content).toBe('Nueva tarea desde Hook');
    expect(storageService.save).toHaveBeenCalled();
  });

  it('should calculate stats correctly', () => {
    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.add('Tarea 1');
      result.current.add('Tarea 2');
    });

    expect(result.current.stats.total).toBe(2);
    expect(result.current.stats.pending).toBe(2);
  });
});