import { render, screen, fireEvent } from '../../../../test/utils';
import { describe, it, expect, vi } from 'vitest';
import { TodoPage } from '../TodoPage';
import * as useTasksHook from '../../../../hooks/useTasks';

vi.mock('../../../../hooks/useTasks');

describe('TodoPage <-> TodoInput Communication', () => {
  const useTasksMock = vi.mocked(useTasksHook.useTasks);

  it('should call the add function from hook when form is submitted', () => {
    useTasksMock.mockReturnValue({
      tasks: [],
      add: vi.fn(),
      searchQuery: '',
      stats: { total: 0, pending: 0, completed: 0 },
      filter: 'all',
      setSearchQuery: vi.fn(),
    });

    render(<TodoPage />);

    const input = screen.getByPlaceholderText(/¿qué hay que hacer hoy?/i);
    const button = screen.getByRole('button', { name: /añadir/i });

    // 1. Escribimos en el input
    fireEvent.change(input, { target: { value: 'Nueva tarea de prueba' } });
    
    // 2. Click en añadir
    fireEvent.click(button);

    // 3. Verificamos que la comunicación llegó al "cerebro" (hook)
    expect(mockAdd).toHaveBeenCalledWith('Nueva tarea de prueba');
    
    // 4. Verificamos que el input se limpió (UX interno del componente)
    expect(input).toHaveValue('');
  });
});
