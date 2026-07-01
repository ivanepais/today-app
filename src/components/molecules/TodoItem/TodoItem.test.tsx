import { render, screen, fireEvent } from '../../../test/utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TodoItem } from './TodoItem';

describe('Molecule: TodoItem', () => {
  const mockProps = {
    id: 'task-123',
    text: 'Aprender Styled Components',
    completed: false,
    onToggle: vi.fn(),
    onDelete: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('render the task text correctly', () => {
    render(<TodoItem {...mockProps} />);
    expect(screen.getByText(mockProps.text)).toBeInTheDocument();
  });

  it('link the checkbox with its label via ID for accessibility', () => {
    render(<TodoItem {...mockProps} />);

    const expectedId = `todo-check-${mockProps.id}`;
    const checkbox = screen.getByRole('checkbox');
    const label = screen.getByText(mockProps.text).closest('label');

    expect(checkbox).toHaveAttribute('id', expectedId);
    expect(label).toHaveAttribute('for', expectedId);
  });

  it('call onToggle when clicking anywhere in the task area (text or background)', () => {
    render(<TodoItem {...mockProps} />);

    const taskText = screen.getByText(mockProps.text);
    fireEvent.click(taskText);

    expect(mockProps.onToggle).toHaveBeenCalledWith(mockProps.id);
  });

  it('delete the task without toggling it (Stop Propagation check)', () => {
    render(<TodoItem {...mockProps} />);

    const deleteButton = screen.getByLabelText(/eliminar tarea/i);
    fireEvent.click(deleteButton);

    // check delete, cancel toggle
    expect(mockProps.onDelete).toHaveBeenCalledWith(mockProps.id);
    expect(mockProps.onToggle).not.toHaveBeenCalled();
  });

  it('have a pointer cursor on the interaction area', () => {
    render(<TodoItem {...mockProps} />);

    const labelArea = screen.getByText(mockProps.text).closest('label');
    expect(labelArea).toHaveStyle({ cursor: 'pointer' });
  });

  it(' apply completed styles when task is done', () => {
    render(<TodoItem {...mockProps} completed={true} />);

    const textElement = screen.getByText(mockProps.text).parentElement;

    expect(textElement).toHaveStyle({
      'text-decoration': 'line-through',
      opacity: '0.5',
    });
  });

  it('should maintain glassmorphism styles in the container', () => {
    const { container } = render(<TodoItem {...mockProps} />);
    const listItem = container.firstChild;

    expect(listItem).toHaveStyle({
      'background-color': 'rgba(255, 255, 255, 0.08)',
    });
  });
});
