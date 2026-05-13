import { render, screen, fireEvent } from '../../../test/utils';
import { describe, it, expect, vi } from 'vitest';
import { TodoItem } from './TodoItem';
import { theme } from '../../../styles/theme';

describe('Molecule: TodoItem', () => {
  const mockProps = {
    id: 'task-123',
    text: 'Aprender Styled Components',
    completed: false,
    onToggle: vi.fn(),
    onDelete: vi.fn(),
  };

  // Limpiamos los mocks antes de cada test para evitar interferencias
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the task text correctly', () => {
    render(<TodoItem {...mockProps} />);
    expect(screen.getByText(mockProps.text)).toBeInTheDocument();
  });

  it('should link the checkbox with its label via ID for accessibility', () => {
    render(<TodoItem {...mockProps} />);

    const expectedId = `todo-check-${mockProps.id}`;
    const checkbox = screen.getByRole('checkbox');
    const label = screen.getByText(mockProps.text).closest('label');

    expect(checkbox).toHaveAttribute('id', expectedId);
    expect(label).toHaveAttribute('for', expectedId);
  });

  it('should call onToggle when clicking anywhere in the task area (text or background)', () => {
    render(<TodoItem {...mockProps} />);

    const taskText = screen.getByText(mockProps.text);
    fireEvent.click(taskText);

    expect(mockProps.onToggle).toHaveBeenCalledWith(mockProps.id);
  });

  it('should delete the task WITHOUT toggling it (Stop Propagation check)', () => {
    render(<TodoItem {...mockProps} />);

    const deleteButton = screen.getByLabelText(/eliminar tarea/i);
    fireEvent.click(deleteButton);

    // Verificamos que se ejecute la eliminación pero se bloquee el toggle
    expect(mockProps.onDelete).toHaveBeenCalledWith(mockProps.id);
    expect(mockProps.onToggle).not.toHaveBeenCalled();
  });

  it('should have a pointer cursor on the interaction area', () => {
    render(<TodoItem {...mockProps} />);

    const labelArea = screen.getByText(mockProps.text).closest('label');
    expect(labelArea).toHaveStyle({ cursor: 'pointer' });
  });

  it('should apply completed styles when task is done', () => {
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
      'background-color': theme.colors.glass,
      'backdrop-filter': 'blur(12px)',
    });
  });
});
