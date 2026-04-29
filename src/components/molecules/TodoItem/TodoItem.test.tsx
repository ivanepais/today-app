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

  it('should render the task text correctly', () => {
    render(<TodoItem {...mockProps} />);
    expect(screen.getByText(mockProps.text)).toBeInTheDocument();
  });

  it('should link the checkbox with its label via ID', () => {
    render(<TodoItem {...mockProps} />);

    const expectedId = `todo-check-${mockProps.id}`;
    const checkbox = screen.getByRole('checkbox');
    const label = screen.getByText(mockProps.text).closest('label');

    expect(checkbox).toHaveAttribute('id', expectedId);
    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute('for', expectedId);
  });

  it('should call onToggle with the correct ID when clicking the checkbox', () => {
    render(<TodoItem {...mockProps} />);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(mockProps.onToggle).toHaveBeenCalledWith(mockProps.id);
  });

  it('should call onDelete with the correct ID when clicking the delete button', () => {
    render(<TodoItem {...mockProps} />);

    const deleteButton = screen.getByLabelText(/eliminar tarea/i);
    fireEvent.click(deleteButton);

    expect(mockProps.onDelete).toHaveBeenCalledWith(mockProps.id);
  });  

  it('should apply "line-through" and lower opacity when completed', () => {
    render(<TodoItem {...mockProps} completed={true} />);

    const textElement = screen.getByText(mockProps.text).parentElement;

    // Verificamos que los estilos de "completado" definidos en el Styled Component se apliquen
    expect(textElement).toHaveStyle({
      'text-decoration': 'line-through',
      opacity: '0.5',
    });
  });

  it('should have a glassmorphism container', () => {
    const { container } = render(<TodoItem {...mockProps} />);
    const listItem = container.firstChild;

    // Verificamos que tenga el fondo traslúcido del mixin glass
    expect(listItem).toHaveStyle({
      'background-color': theme.colors.glass,
      'backdrop-filter': 'blur(12px)',
    });
  });
});
