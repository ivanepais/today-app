/*
import { render, screen, fireEvent } from '../../../test/utils';
import { describe, it, expect, vi } from 'vitest';
import { TodoList } from './TodoList';
import { render, screen, fireEvent } from '../../../test/utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TodoList } from './TodoList';
import type { Task } from '@/core/task.entity';

describe('Organism: TodoList', () => {
  const mockTodos: Task[] = [
    { id: '1', content: 'Tarea 1', isCompleted: false },
    { id: '2', content: 'Tarea 2', isCompleted: true },
  ];

  const mockOnToggle = vi.fn();
  const mockOnDelete = vi.fn();

  // 1. DUMMY DATA: Datos de relleno para satisfacer a TypeScript
  // en los tests donde el estado vacío no nos interesa.
  const dummyEmptyProps = {
    emptyIcon: '📦',
    emptyTitle: 'Título dummy',
    emptyDescription: 'Descripción dummy',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  // 2. NUEVA PRUEBA DEL CONTRATO: Valida que el componente pinte exactamente lo que recibe
  it('should render the injected empty state content when todos array is empty', () => {
    render(
      <TodoList
        todos={[]}
        onToggleTodo={mockOnToggle}
        onDeleteTodo={mockOnDelete}
        emptyIcon="🎯"
        emptyTitle="Título de Prueba Personalizado"
        emptyDescription="Descripción de Prueba Personalizada"
      />,
    );

    expect(
      screen.getByText('Título de Prueba Personalizado'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Descripción de Prueba Personalizada'),
    ).toBeInTheDocument();
    expect(screen.getByText('🎯')).toBeInTheDocument();
  });

  it('should render a list of TodoItems when todos are provided', () => {
    render(
      <TodoList
        todos={mockTodos} // Corregido el cast erróneo del archivo original
        onToggleTodo={mockOnToggle}
        onDeleteTodo={mockOnDelete}
        {...dummyEmptyProps} // Pasamos los props obligatorios usando spread
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
        {...dummyEmptyProps}
      />,
    );

    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);

    expect(mockOnToggle).toHaveBeenCalledWith('1');
  });

  it('should propagate the delete event with correct ID', () => {
    render(
      <TodoList
        todos={mockTodos}
        onToggleTodo={mockOnToggle}
        onDeleteTodo={mockOnDelete}
        {...dummyEmptyProps}
      />,
    );

    const deleteButtons = screen.getAllByLabelText(/eliminar tarea/i);
    fireEvent.click(deleteButtons[1]);

    expect(mockOnDelete).toHaveBeenCalledWith('2');
  });
});
