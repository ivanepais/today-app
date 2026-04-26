import { render, screen, fireEvent } from '../../../test/utils';
import { describe, it, expect, vi } from 'vitest';
import { TodoItem } from './TodoItem';
import { theme } from '../../../styles/theme';

describe('Molecule: TodoItem', () => {
  const mockProps = {
    text: 'Aprender Styled Components',
    completed: false,
    onToggle: vi.fn(),
    onDelete: vi.fn(),
  };

  it('should render the task text correctly', () => {
    render(<TodoItem {...mockProps} />);
    expect(screen.getByText(mockProps.text)).toBeInTheDocument();
  });

  it('should call onToggle when clicking the checkbox', () => {
    render(<TodoItem {...mockProps} />);

    // Buscamos el checkbox por su rol
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(mockProps.onToggle).toHaveBeenCalledTimes(1);
  });

  it('should call onDelete when clicking the delete button', () => {
    render(<TodoItem {...mockProps} />);

    // Buscamos el botón de eliminar por su aria-label
    const deleteButton = screen.getByLabelText(/eliminar tarea/i);
    fireEvent.click(deleteButton);

    expect(mockProps.onDelete).toHaveBeenCalledTimes(1);
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
