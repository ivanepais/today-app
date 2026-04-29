import { render, screen, fireEvent } from '../../../test/utils';
import { describe, it, expect, vi } from 'vitest';
import { TodoList } from './TodoList';
import type { Task } from '@/core/task.entity';

describe('Organism: TodoList', () => {
  const mockTodos: Task[] = [
    { id: '1', content: 'Tarea 1', isCompleted: false },
    { id: '2', content: 'Tarea 2', isCompleted: true },
  ];

  const mockOnToggle = vi.fn();
  const mockOnDelete = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the normal empty state when not searching', () => {
    render(
      <TodoList
        todos={[]}
        onToggleTodo={mockOnToggle}
        onDeleteTodo={mockOnDelete}
        isSearching={false}
      />,
    );

    expect(screen.getByText(/no hay tareas pendientes/i)).toBeInTheDocument();
    expect(screen.getByText(/📝/)).toBeInTheDocument();
  });

  it('should render the search empty state when isSearching is true', () => {
    render(
      <TodoList
        todos={[]}
        onToggleTodo={mockOnToggle}
        onDeleteTodo={mockOnDelete}
        isSearching={true}
      />,
    );

    expect(screen.getByText(/no hay coincidencias/i)).toBeInTheDocument();
    expect(screen.getByText(/🔍/)).toBeInTheDocument();
  });

  it('should render a list of TodoItems when todos are provided', () => {
    render(
      <TodoList
        todos={mockTodos as Task}
        onToggleTodo={mockOnToggle}
        onDeleteTodo={mockOnDelete}
        isSearching={false}
      />,
    );

    expect(screen.getByText('Tarea 1')).toBeInTheDocument();
    expect(screen.getByText('Tarea 2')).toBeInTheDocument();
    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  it('should propagate the toggle event with correct ID', () => {
    render(
      <TodoList
        todos={mockTodos}
        onToggleTodo={mockOnToggle}
        onDeleteTodo={mockOnDelete}
        isSearching={false}
      />,
    );

    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);

    // Verificamos que la delegación funcionó: el ID '1' viajó de vuelta
    expect(mockOnToggle).toHaveBeenCalledWith('1');
  });

  it('should propagate the delete event with correct ID', () => {
    render(
      <TodoList
        todos={mockTodos}
        onToggleTodo={mockOnToggle}
        onDeleteTodo={mockOnDelete}
        isSearching={false}
      />,
    );

    const deleteButtons = screen.getAllByLabelText(/eliminar tarea/i);
    fireEvent.click(deleteButtons[1]);

    // Verificamos que la delegación funcionó: el ID '2' viajó de vuelta
    expect(mockOnDelete).toHaveBeenCalledWith('2');
  });

  it('should propagate the toggle event to the correct item', () => {
    render(
      <TodoList
        todos={mockTodos}
        onToggleTodo={mockOnToggle}
        onDeleteTodo={mockOnDelete}
        isSearching={false}
      />,
    );

    // Obtenemos todos los checkboxes (hay 2 según mockTodos)
    const checkboxes = screen.getAllByRole('checkbox');

    // Simulamos click en el primero
    fireEvent.click(checkboxes[0]);

    // Verificamos que se llamó con el ID correcto ('1')
    expect(mockOnToggle).toHaveBeenCalledWith('1');
  });

  it('should propagate the delete event to the correct item', () => {
    render(
      <TodoList
        todos={mockTodos}
        onToggleTodo={mockOnToggle}
        onDeleteTodo={mockOnDelete}
        isSearching={false}
      />,
    );

    // Obtenemos los botones de eliminar por su label de accesibilidad
    const deleteButtons = screen.getAllByLabelText(/eliminar tarea/i);

    // Simulamos click en el segundo botón
    fireEvent.click(deleteButtons[1]);

    // Verificamos que se llamó con el ID correcto ('2')
    expect(mockOnDelete).toHaveBeenCalledWith('2');
  });
});
