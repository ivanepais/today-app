import { render, screen, fireEvent } from '../../../test/utils';
import { describe, it, expect, vi } from 'vitest';
import { TodoList } from './TodoList';

describe('Organism: TodoList', () => {
  const mockTodos = [
    { id: '1', text: 'Tarea 1', completed: false },
    { id: '2', text: 'Tarea 2', completed: true },
  ];

  const mockOnToggle = vi.fn();
  const mockOnDelete = vi.fn();

  it('should render the empty state when there are no todos', () => {
    render(
      <TodoList 
        todos={[]} 
        onToggleTodo={mockOnToggle} 
        onDeleteTodo={mockOnDelete} 
      />
    );

    expect(screen.getByText(/no hay tareas pendientes/i)).toBeInTheDocument();
    expect(screen.getByText(/¡añade algo para empezar el día!/i)).toBeInTheDocument();
  });

  it('should render a list of TodoItems when todos are provided', () => {
    render(
      <TodoList 
        todos={mockTodos} 
        onToggleTodo={mockOnToggle} 
        onDeleteTodo={mockOnDelete} 
      />
    );

    // Verificamos que se rendericen ambos textos
    expect(screen.getByText('Tarea 1')).toBeInTheDocument();
    expect(screen.getByText('Tarea 2')).toBeInTheDocument();
    
    // Verificamos que sea una lista (ul)
    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  it('should propagate the toggle event to the correct item', () => {
    render(
      <TodoList 
        todos={mockTodos} 
        onToggleTodo={mockOnToggle} 
        onDeleteTodo={mockOnDelete} 
      />
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
      />
    );

    // Obtenemos los botones de eliminar por su label de accesibilidad
    const deleteButtons = screen.getAllByLabelText(/eliminar tarea/i);
    
    // Simulamos click en el segundo botón
    fireEvent.click(deleteButtons[1]);

    // Verificamos que se llamó con el ID correcto ('2')
    expect(mockOnDelete).toHaveBeenCalledWith('2');
  });
});