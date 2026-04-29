import { render, screen, fireEvent, within } from '../../../test/utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { TodoPage } from './TodoPage';

// NOTA: Aquí NO mockeamos useTasks. Usamos la implementación real.

describe('Page: TodoPage (Functional)', () => {
  const STORAGE_KEY = 'v1_tasks_data'; // Asegúrate que coincida con tu hook

  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('should allow a user to add a new task and see it in the list', () => {
    render(<TodoPage />);

    const input = screen.getByPlaceholderText(/¿qué hay que hacer hoy\?/i);
    const addButton = screen.getByRole('button', { name: /añadir/i });

    fireEvent.change(input, { target: { value: 'Aprender Vitest' } });
    fireEvent.click(addButton);

    // Verificamos con la nueva propiedad 'content'
    expect(screen.getByText('Aprender Vitest')).toBeInTheDocument();
    expect(input).toHaveValue('');
  });

  it('should toggle task status and reflect changes in UI', () => {
    render(<TodoPage />);

    // 1. Añadimos la tarea
    const input = screen.getByPlaceholderText(/¿qué hay que hacer hoy\?/i);
    fireEvent.change(input, { target: { value: 'Tarea para completar' } });
    fireEvent.click(screen.getByRole('button', { name: /añadir/i }));

    // 2. Identificamos el contenedor de la lista (para ignorar el Sidebar)
    const listContainer = screen.getByTestId('todo-list-container');

    // 3. Buscamos el checkbox SOLO dentro de la lista
    // Como solo hay una tarea, within(listContainer) solo encontrará un checkbox
    const checkbox = within(listContainer).getByRole('checkbox');
    const taskText = within(listContainer).getByText('Tarea para completar');

    // 4. Actuamos
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    // Verificamos el estilo en el elemento padre o el texto
    expect(taskText.parentElement).toHaveStyle({
      'text-decoration': 'line-through',
    });
  });

  it('should filter tasks when using the search bar in the Sidebar', () => {
    render(<TodoPage />);

    // Añadimos dos tareas
    const input = screen.getByPlaceholderText(/¿qué hay que hacer hoy\?/i);
    const addButton = screen.getByRole('button', { name: /añadir/i });

    fireEvent.change(input, { target: { value: 'Comprar leche' } });
    fireEvent.click(addButton);
    fireEvent.change(input, { target: { value: 'Comprar pan' } });
    fireEvent.click(addButton);

    // Usamos el buscador del Sidebar
    const searchInput = screen.getByPlaceholderText(/buscar tareas/i);
    fireEvent.change(searchInput, { target: { value: 'leche' } });

    // Debería ver 'leche' pero no 'pan'
    expect(screen.getByText('Comprar leche')).toBeInTheDocument();
    expect(screen.queryByText('Comprar pan')).not.toBeInTheDocument();
  });

  it('should persist tasks in localStorage with the correct entity structure', () => {
    // 1. Simulamos datos con la nueva estructura Task
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

  it('should remove a task when the delete button is clicked', () => {
    render(<TodoPage />);

    // Añadir
    fireEvent.change(screen.getByPlaceholderText(/¿qué hay que hacer hoy\?/i), {
      target: { value: 'Tarea a eliminar' },
    });
    fireEvent.click(screen.getByRole('button', { name: /añadir/i }));

    // Borrar usando el nuevo aria-label que añadimos en TodoItem
    const deleteButton = screen.getByLabelText(/eliminar tarea/i);
    fireEvent.click(deleteButton);

    expect(screen.queryByText('Tarea a eliminar')).not.toBeInTheDocument();
  });
});
