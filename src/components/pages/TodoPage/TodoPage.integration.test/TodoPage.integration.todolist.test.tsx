import { render, screen, within } from '../../../../test/utils';
import { describe, it, expect, vi } from 'vitest';
import { TodoPage } from '../TodoPage';
import * as useTasksHook from '../../../../hooks/useTasks';

vi.mock('../../../../hooks/useTasks');

describe('TodoPage <-> TodoList Integration', () => {
  const useTasksMock = vi.mocked(useTasksHook.useTasks);

  it('should pass isSearching=true to TodoList when there is a search query', () => {
    // Simulamos que el hook devuelve una búsqueda activa pero sin resultados
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

    // 1. Buscamos el contenedor específico por Test ID
    const listContainer = screen.getByTestId('todo-list-container');

    // 2. Verificamos que los elementos del EmptyState de búsqueda estén ahí
    expect(
      within(listContainer).getByText(/no hay coincidencias/i),
    ).toBeInTheDocument();
    expect(within(listContainer).getByText('🔍')).toBeInTheDocument();
  });

  it('should pass isSearching=false to TodoList when search query is empty', () => {
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

    // Para el texto "No hay tareas pendientes", usamos regex de coincidencia exacta
    // para que no choque con "¡Estás al día! No hay tareas pendientes" del Header.
    expect(
      within(listContainer).getByText(/^no hay tareas pendientes$/i),
    ).toBeInTheDocument();
    expect(within(listContainer).getByText('📝')).toBeInTheDocument();
  });
});
