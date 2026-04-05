import { render, screen, fireEvent } from '../../../test/utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { TodoPage } from './TodoPage';

describe('Page: TodoPage', () => {
  // Limpiamos el localStorage antes de cada test para evitar contaminación
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('should allow a user to add a new todo', () => {
    render(<TodoPage />);
    
    const input = screen.getByPlaceholderText(/¿qué hay que hacer hoy\?/i);
    const addButton = screen.getByRole('button', { name: /añadir/i });

    // 1. Escribimos
    fireEvent.change(input, { target: { value: 'Comprar café' } });
    // 2. Click en añadir
    fireEvent.click(addButton);

    // 3. Verificamos que aparezca en la lista
    expect(screen.getByText('Comprar café')).toBeInTheDocument();
    // 4. Verificamos que el input se haya limpiado
    expect(input).toHaveValue('');
  });

  it('should toggle a todo status when clicked', () => {
    render(<TodoPage />);
    
    // Añadimos una tarea primero
    const input = screen.getByPlaceholderText(/¿qué hay que hacer hoy\?/i);
    fireEvent.change(input, { target: { value: 'Tarea para completar' } });
    fireEvent.click(screen.getByRole('button', { name: /añadir/i }));

    const checkbox = screen.getByRole('checkbox');
    const text = screen.getByText('Tarea para completar');

    // 1. Marcamos como completada
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    
    // Verificamos el estilo (que viene de la molécula TodoItem)
    expect(text.parentElement).toHaveStyle({ 'text-decoration': 'line-through' });

    // 2. Desmarcamos
    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it('should remove a todo from the list', () => {
    render(<TodoPage />);
    
    // Añadimos
    fireEvent.change(screen.getByPlaceholderText(/¿qué hay que hacer hoy\?/i), { 
      target: { value: 'Tarea efímera' } 
    });
    fireEvent.click(screen.getByRole('button', { name: /añadir/i }));

    // Borramos
    const deleteButton = screen.getByLabelText(/eliminar tarea/i);
    fireEvent.click(deleteButton);

    // Verificamos que ya no esté
    expect(screen.queryByText('Tarea efímera')).not.toBeInTheDocument();
  });

  it('should persist and load todos from localStorage', () => {
    // 1. Simulamos datos ya existentes en localStorage
    const savedTodos = [
      { id: '123', text: 'Tarea persistida', completed: false }
    ];
    localStorage.setItem('liquid-glass-todos', JSON.stringify(savedTodos));

    render(<TodoPage />);

    // 2. Verificamos que la página los haya cargado al montar
    expect(screen.getByText('Tarea persistida')).toBeInTheDocument();
  });
});