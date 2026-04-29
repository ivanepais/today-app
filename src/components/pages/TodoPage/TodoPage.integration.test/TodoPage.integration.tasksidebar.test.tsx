import { render, screen, fireEvent } from '../../../../test/utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TodoPage } from '../TodoPage';
import * as useTasksHook from '../../../../hooks/useTasks';

// Mockeamos el hook para simular diferentes estados
vi.mock('../../../../hooks/useTasks');

describe('Page: TodoPage - Sidebar Communication', () => {
  const useTasksMock = vi.mocked(useTasksHook.useTasks);

  const mockSetFilter = vi.fn();
  const mockSetSearchQuery = vi.fn();
  const mockClearCompleted = vi.fn();

  const mockStats = {
    total: 5,
    pending: 3,
    completed: 2,
  };

  beforeEach(() => {
    vi.clearAllMocks();

    // 3. Ahora podemos usar .mockReturnValue con total seguridad de tipos
    // TypeScript validará que el objeto devuelto coincida exactamente con la interfaz del hook
    useTasksMock.mockReturnValue({
      tasks: [],
      add: vi.fn(),
      toggle: vi.fn(),
      remove: vi.fn(),
      filter: 'all',
      setFilter: mockSetFilter,
      searchQuery: '',
      setSearchQuery: mockSetSearchQuery,
      stats: mockStats,
      clearCompleted: mockClearCompleted,
    });
  });

  it('should update search query when typing in Sidebar search input', () => {
    render(<TodoPage />);

    const searchInput = screen.getByPlaceholderText(/buscar tareas/i);
    fireEvent.change(searchInput, { target: { value: 'Aprender React' } });

    expect(mockSetSearchQuery).toHaveBeenCalledWith('Aprender React');
  });

  it('should change filter when clicking on category in Sidebar', () => {
    render(<TodoPage />);

    // Buscamos el botón de la categoría "Pendientes"
    // Nota: Como usamos Typography como label, el texto es accesible
    const pendingCategory = screen.getByText(/^pendientes$/i);
    fireEvent.click(pendingCategory);

    expect(mockSetFilter).toHaveBeenCalledWith('pending');
  });

  it('should show the correct task counts in Sidebar categories', () => {
    render(<TodoPage />);

    // Verificamos que los counts de los stats se pasen correctamente
    expect(screen.getByText(mockStats.total.toString())).toBeInTheDocument();
    expect(screen.getByText(mockStats.pending.toString())).toBeInTheDocument();
    expect(
      screen.getByText(mockStats.completed.toString()),
    ).toBeInTheDocument();
  });

  it('should call clearCompleted when clicking the action button in Sidebar', () => {
    render(<TodoPage />);

    const clearButton = screen.getByText(/borrar completadas/i);
    fireEvent.click(clearButton);

    expect(mockClearCompleted).toHaveBeenCalledTimes(1);
  });
});
