import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useTasks } from './useTasks';
import { storageService } from '@/services/storage.service';

// Mock storage
vi.mock('@/services/storage.service', () => ({
  storageService: {
    load: vi.fn(),
    save: vi.fn(),
  },
}));

describe('useTasks Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Storage starts empty
    vi.mocked(storageService.load).mockReturnValue([]);
  });

  it('initialize tasks from storage if they exist', () => {
    const mockTasks = [
      { id: '1', content: 'Persistida', isCompleted: false, createdAt: 123 },
    ];
    vi.mocked(storageService.load).mockReturnValue(mockTasks);

    const { result } = renderHook(() => useTasks());

    expect(result.current.tasks).toHaveLength(1);
    expect(result.current.tasks[0].content).toBe('Persistida');
  });

  it('filter tasks by searchQuery (case insensitive)', () => {
    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.add('Comprar Pan');
      result.current.add('Lavar Auto');
      result.current.setSearchQuery('PAN');
    });

    expect(result.current.tasks).toHaveLength(1);
    expect(result.current.tasks[0].content).toBe('Comprar Pan');
  });

  it('status filter and search', () => {
    const { result } = renderHook(() => useTasks());

    // Pending
    act(() => {
      result.current.add('Aprender Vitest');
      result.current.add('Aprender React');
    });

    // Marked as completed
    act(() => {
      const id = result.current.tasks[0].id;
      result.current.toggle(id);
    });

    // Apply filter
    act(() => {
      result.current.setFilter('completed');
      result.current.setSearchQuery('Vitest');
    });

    expect(result.current.tasks).toHaveLength(1);
    expect(result.current.tasks[0].content).toBe('Aprender Vitest');
  });

  it('general statistics', () => {
    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.add('Tarea 1');
      result.current.add('Tarea 2');
      result.current.setSearchQuery('Algo que no existe');
    });

    // Task list empty in search
    expect(result.current.tasks).toHaveLength(0);

    // Statistics count all
    expect(result.current.stats.total).toBe(2);
  });
});
