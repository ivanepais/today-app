import { render, screen, within } from '../../../../test/utils';
import { describe, it, expect, vi } from 'vitest';
import { TodoPage } from '../TodoPage';
import * as useTasksHook from '../../../../hooks/useTasks';

vi.mock('../../../../hooks/useTasks');

describe('TodoPage <-> TodoList Integration', () => {
  const useTasksMock = vi.mocked(useTasksHook.useTasks);

  it('should display search empty state contents when a search query yields no results', () => {
    // Simulamos un estado de búsqueda activa pero sin tareas que coincidan
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

    // 1. Aislamos el contenedor que envuelve a la lista presentacional
    const listContainer = screen.getByTestId('todo-list-container');

    // 2. Evaluamos que TodoPage haya inyectado con éxito los textos de búsqueda
    expect(
      within(listContainer).getByText(/no hay coincidencias/i),
    ).toBeInTheDocument();
    expect(within(listContainer).getByText('🔍')).toBeInTheDocument();
  });

  it('should display default empty state contents when search is empty and filter is "all"', () => {
    // Simulamos la aplicación recién abierta, sin tareas y sin búsquedas
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

    // Cambiamos el texto esperado a "No hay tareas" 
    // para cumplir con el diccionario de configuraciones de la categoría 'all'.
    expect(
      within(listContainer).getByText(/^no hay tareas$/i),
    ).toBeInTheDocument();
    expect(within(listContainer).getByText('📝')).toBeInTheDocument();
  });
});