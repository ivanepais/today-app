import { render, screen, fireEvent } from '../../../../test/utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TodoPage } from '../TodoPage';
import * as useTasksHook from '../../../../hooks/useTasks';

// Mock hook states
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

    // .mockReturnValue for type
    // TS object and hook
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

  it('update search query when typing in Sidebar search input', () => {
    render(<TodoPage />);

    const searchInput = screen.getByPlaceholderText(/buscar.../i);
    fireEvent.change(searchInput, { target: { value: 'React' } });

    expect(mockSetSearchQuery).toHaveBeenCalledWith('React');
  });

  it('change filter when clicking on category in Sidebar', () => {
    render(<TodoPage />);

    // Search category
    const pendingCategory = screen.getByText(/^pendientes$/i);
    fireEvent.click(pendingCategory);

    expect(mockSetFilter).toHaveBeenCalledWith('pending');
  });

  it('show the correct task counts in Sidebar categories', () => {
    render(<TodoPage />);

    // Counts
    expect(screen.getByText(mockStats.total.toString())).toBeInTheDocument();
    expect(screen.getByText(mockStats.pending.toString())).toBeInTheDocument();
    expect(
      screen.getByText(mockStats.completed.toString()),
    ).toBeInTheDocument();
  });

  it('call clearCompleted when clicking the action button in Sidebar', () => {
    render(<TodoPage />);

    const clearButton = screen.getByText(/borrar completadas/i);
    fireEvent.click(clearButton);

    expect(mockClearCompleted).toHaveBeenCalledTimes(1);
  });
});
