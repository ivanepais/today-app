import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useTasks } from './useTasks';
import { storageService } from '@/services/storage.service';

// Mockeamos el servicio de storage
vi.mock('@/services/storage.service', () => ({
  storageService: {
    load: vi.fn(),
    save: vi.fn(),
  },
}));

describe('useTasks Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Por defecto, el storage empieza vacío
    vi.mocked(storageService.load).mockReturnValue([]);
  });

  it('debería inicializar con tareas desde el storage si existen', () => {
    const mockTasks = [
      { id: '1', content: 'Persistida', isCompleted: false, createdAt: 123 },
    ];
    vi.mocked(storageService.load).mockReturnValue(mockTasks);

    const { result } = renderHook(() => useTasks());

    expect(result.current.tasks).toHaveLength(1);
    expect(result.current.tasks[0].content).toBe('Persistida');
  });

  it('debería filtrar tareas por el searchQuery (case insensitive)', () => {
    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.add('Comprar Pan');
      result.current.add('Lavar Auto');
      result.current.setSearchQuery('PAN'); // Testeamos case insensitivity
    });

    expect(result.current.tasks).toHaveLength(1);
    expect(result.current.tasks[0].content).toBe('Comprar Pan');
  });

  it('debería combinar filtro de estado y búsqueda', () => {
    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.add('Aprender Vitest'); // Pendiente
      result.current.add('Aprender React'); // Pendiente
    });

    // Marcamos una como completada
    act(() => {
      const id = result.current.tasks[0].id;
      result.current.toggle(id);
    });

    // Aplicamos ambos filtros
    act(() => {
      result.current.setFilter('completed');
      result.current.setSearchQuery('Vitest');
    });

    expect(result.current.tasks).toHaveLength(1);
    expect(result.current.tasks[0].content).toBe('Aprender Vitest');
  });

  it('las estadísticas deben basarse en TODAS las tareas, no solo las filtradas', () => {
    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.add('Tarea 1');
      result.current.add('Tarea 2');
      result.current.setSearchQuery('Algo que no existe');
    });

    // El listado de tareas está vacío por la búsqueda
    expect(result.current.tasks).toHaveLength(0);
    // Pero las estadísticas siguen contando el total real
    expect(result.current.stats.total).toBe(2);
  });
});
