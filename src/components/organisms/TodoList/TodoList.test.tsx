import { render, screen, fireEvent } from '../../../test/utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TodoList } from './TodoList';
import type { Task } from '@/core/task.entity';

describe('Organism: TodoList', () => {
  const mockTodos: Task[] = [
    { id: '1', content: 'Task 1', isCompleted: false },
    { id: '2', content: 'Task 2', isCompleted: true },
  ];

  const mockOnToggle = vi.fn();
  const mockOnDelete = vi.fn();

  // Dummy Data for empty state
  const dummyEmptyProps = {
    emptyIcon: '📦',
    emptyTitle: 'Title dummy',
    emptyDescription: 'Description dummy',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Check interface
  it('render the injected empty state content when todos array is empty', () => {
    render(
      <TodoList
        todos={[]}
        onToggleTodo={mockOnToggle}
        onDeleteTodo={mockOnDelete}
        emptyIcon="🎯"
        emptyTitle="Title test"
        emptyDescription="Description test"
      />,
    );

    expect(
      screen.getByText('Title test'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Description test'),
    ).toBeInTheDocument();
    expect(screen.getByText('🎯')).toBeInTheDocument();
  });

  it('render a list of TodoItems when todos are provided', () => {
    render(
      <TodoList
        todos={mockTodos}
        onToggleTodo={mockOnToggle}
        onDeleteTodo={mockOnDelete}
        {...dummyEmptyProps} // props with spread
      />,
    );

    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
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

  it('propagate the delete event with correct ID', () => {
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
