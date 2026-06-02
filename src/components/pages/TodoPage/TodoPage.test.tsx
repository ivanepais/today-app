import { render, screen, fireEvent, within } from '../../../test/utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { TodoPage } from './TodoPage';

describe('Page: TodoPage (Functional & Core Logic)', () => {
  const STORAGE_KEY = 'v1_tasks_data';

  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('allow a user to add a new task and see it in the list', () => {
    render(<TodoPage />);

    const input = screen.getByPlaceholderText(/¿qué hay que hacer hoy\?/i);
    const addButton = screen.getByRole('button', { name: /añadir/i });

    fireEvent.change(input, { target: { value: 'Vitest' } });
    fireEvent.click(addButton);

    expect(screen.getByText('Vitest')).toBeInTheDocument();
    expect(input).toHaveValue('');
  });

  it('toggle task status and reflect changes in UI', () => {
    render(<TodoPage />);

    const input = screen.getByPlaceholderText(/¿qué hay que hacer hoy\?/i);
    fireEvent.change(input, { target: { value: 'Tarea para completar' } });
    fireEvent.click(screen.getByRole('button', { name: /añadir/i }));

    const listContainer = screen.getByTestId('todo-list-container');
    const checkbox = within(listContainer).getByRole('checkbox');
    const taskText = within(listContainer).getByText('Tarea para completar');

    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    expect(taskText.parentElement).toHaveStyle({
      'text-decoration': 'line-through',
    });
  });

  it('filter tasks when using the search bar in the Sidebar', () => {
    render(<TodoPage />);

    const input = screen.getByPlaceholderText(/¿qué hay que hacer hoy\?/i);
    const addButton = screen.getByRole('button', { name: /añadir/i });

    fireEvent.change(input, { target: { value: 'buy milk' } });
    fireEvent.click(addButton);
    fireEvent.change(input, { target: { value: 'buy bread' } });
    fireEvent.click(addButton);

    const searchInput = screen.getByPlaceholderText(/Buscar.../i);
    fireEvent.change(searchInput, { target: { value: 'milk' } });

    expect(screen.getByText('buy milk')).toBeInTheDocument();
    expect(screen.queryByText('buy bread')).not.toBeInTheDocument();
  });

  it('persist tasks in localStorage with the correct entity structure', () => {
    const savedTasks = [
      {
        id: '1',
        content: 'Tarea desde el pasado',
        isCompleted: false,
        createdAt: Date.now(),
      },
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedTasks));

    render(<TodoPage />);

    expect(screen.getByText('Tarea desde el pasado')).toBeInTheDocument();
  });

  it('remove a task when the delete button is clicked', () => {
    render(<TodoPage />);

    fireEvent.change(screen.getByPlaceholderText(/¿qué hay que hacer hoy\?/i), {
      target: { value: 'Tarea a eliminar' },
    });
    fireEvent.click(screen.getByRole('button', { name: /añadir/i }));

    const deleteButton = screen.getByLabelText(/eliminar tarea/i);
    fireEvent.click(deleteButton);

    expect(screen.queryByText('Tarea a eliminar')).not.toBeInTheDocument();
  });

  it('render the default empty state (all) when initialized without tasks', () => {
    render(<TodoPage />);

    expect(screen.getByText('No hay tareas')).toBeInTheDocument();
    expect(
      screen.getByText('¡Añade algo para empezar el día!'),
    ).toBeInTheDocument();
    expect(screen.getByText('📝')).toBeInTheDocument();
  });

  it('render the pending empty state when clicking on the Pendientes filter', () => {
    render(<TodoPage />);

    // Click in filter
    const pendingFilterButton = screen.getByText('Pendientes');
    fireEvent.click(pendingFilterButton);

    expect(screen.getByText('No hay tareas pendientes')).toBeInTheDocument();
    expect(
      screen.getByText('¡Estás completamente al día!'),
    ).toBeInTheDocument();
    expect(screen.getByText('⚡')).toBeInTheDocument();
  });

  it('render the completed empty state when clicking on the Completadas filter', () => {
    render(<TodoPage />);

    // Click in filter
    const completedFilterButton = screen.getByText('Completadas');
    fireEvent.click(completedFilterButton);

    expect(screen.getByText('No hay tareas completadas')).toBeInTheDocument();
    expect(
      screen.getByText('Aún no has terminado ninguna tarea.'),
    ).toBeInTheDocument();
    expect(screen.getByText('✅')).toBeInTheDocument();
  });

  it('prioritize the search empty state over category empty states', () => {
    render(<TodoPage />);

    // Filter
    fireEvent.click(screen.getByText('Completadas'));

    // Write
    const searchInput = screen.getByPlaceholderText(/Buscar.../i);
    fireEvent.change(searchInput, {
      target: { value: 'Texto Fantasma que no existe' },
    });

    // Search status prevailed over the category status.
    expect(screen.getByText('No hay coincidencias')).toBeInTheDocument();

    // Text in the completed category should not be on screen
    expect(
      screen.queryByText('No hay tareas completadas'),
    ).not.toBeInTheDocument();
  });
});
