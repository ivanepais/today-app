import { render, screen, fireEvent } from '../../../../test/utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TodoPage } from '../TodoPage';
import * as useTasksHook from '../../../../hooks/useTasks';

// 1. Mockeamos el módulo del hook global
vi.mock('../../../../hooks/useTasks');

describe('TodoPage <-> TodoInput Communication', () => {
  const useTasksMock = vi.mocked(useTasksHook.useTasks);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call the add function from hook when form is submitted', () => {
    // 2. Declaramos explícitamente el espía antes de usarlo
    const mockAdd = vi.fn();

    // 3. Agregamos todas las propiedades que TodoPage desestructura ahora
    useTasksMock.mockReturnValue({
      tasks: [],
      add: mockAdd,
      toggle: vi.fn(),
      remove: vi.fn(),
      filter: 'all',
      setFilter: vi.fn(),
      searchQuery: '',
      setSearchQuery: vi.fn(),
      stats: { total: 0, pending: 0, completed: 0 },
      clearCompleted: vi.fn(),
    });

    render(<TodoPage />);

    const input = screen.getByPlaceholderText(/¿qué hay que hacer hoy\?/i);
    const button = screen.getByRole('button', { name: /añadir/i });

    // Acciones del usuario
    fireEvent.change(input, { target: { value: 'Nueva tarea de prueba' } });
    fireEvent.click(button);

    // Asersiones de Integración
    expect(mockAdd).toHaveBeenCalledWith('Nueva tarea de prueba');
    expect(input).toHaveValue('');
  });
});
