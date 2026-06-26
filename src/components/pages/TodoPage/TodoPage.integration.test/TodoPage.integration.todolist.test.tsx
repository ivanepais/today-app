import { render, screen, within } from '../../../../test/utils';
import { describe, it, expect, vi } from 'vitest';
import { TodoPage } from '../TodoPage';
import * as useTasksHook from '../../../../hooks/useTasks';

vi.mock('../../../../hooks/useTasks');

describe('TodoPage <-> TodoList Integration', () => {
  const useTasksMock = vi.mocked(useTasksHook.useTasks);

  it('display search empty state contents when a search query yields no results', () => {
    // Mock search state without task
    useTasksMock.mockReturnValue({
      tasks: [],
      searchQuery: 'Tarea inexistente',
      stats: { total: 0, pending: 0, completed: 0 },
      filter: 'all',
      setSearchQuery: vi.fn(),
      setFilter: vi.fn(),
      add: vi.fn(),
      toggle: vi.fn(),
      remove: vi.fn(),
      clearCompleted: vi.fn(),
    });

    render(<TodoPage />);

    // List Container
    const listContainer = screen.getByTestId('todo-list-container');

    // Text for search
    expect(
      within(listContainer).getByText(/no hay coincidencias/i),
    ).toBeInTheDocument();
    expect(within(listContainer).getByText('🔍')).toBeInTheDocument();
  });

  it('display default empty state contents when search is empty and filter is "all"', () => {
    // Mock empty app
    useTasksMock.mockReturnValue({
      tasks: [],
      searchQuery: '',
      stats: { total: 0, pending: 0, completed: 0 },
      filter: 'all',
      setSearchQuery: vi.fn(),
      setFilter: vi.fn(),
      add: vi.fn(),
      toggle: vi.fn(),
      remove: vi.fn(),
      clearCompleted: vi.fn(),
    });

    render(<TodoPage />);

    const listContainer = screen.getByTestId('todo-list-container');

    // Test string
    // Category 'all'.
    expect(
      within(listContainer).getByText(/^no hay tareas$/i),
    ).toBeInTheDocument();
    expect(within(listContainer).getByText('📝')).toBeInTheDocument();
  });
});