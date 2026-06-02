import { render, screen, fireEvent } from '../../../test/utils';
import { describe, it, expect, vi } from 'vitest';
import { SearchInput } from './SearchInput';

describe('Molecule: SearchInput', () => {
  const defaultProps = {
    value: '',
    onChange: vi.fn(),
    placeholder: 'Buscar tarea...',
  };

  it('render the icon and input with its placeholder', () => {
    render(<SearchInput {...defaultProps} />);

    const input = screen.getByPlaceholderText(/buscar tarea/i);
    expect(input).toBeInTheDocument();
    expect(screen.getByText('🔍')).toBeInTheDocument();
  });

  it('propagate the value as a string when writing', () => {
    const handleChange = vi.fn();
    render(<SearchInput {...defaultProps} onChange={handleChange} />);

    const input = screen.getByRole('textbox');

    // simulate the DOM event
    fireEvent.change(input, { target: { value: 'Nueva tarea' } });

    // deliver the clean data
    // If communication were to fail
    expect(handleChange).toHaveBeenCalledWith('Nueva tarea');
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('el icono no debe bloquear la interacción del mouse', () => {
    render(<SearchInput {...defaultProps} />);
    const icon = screen.getByText('🔍');

    // click on the magnifying glass, the focus goes to the input
    expect(icon).toHaveStyle({ 'pointer-events': 'none' });
  });

  // accessibility
  it('correct accessibility labels', () => {
    render(<SearchInput {...defaultProps} />);
    const icon = screen.getByLabelText('Icono de búsqueda');
    expect(icon).toHaveAttribute('role', 'img');
  });

  it('call onSearch when Enter is pressed on the input', () => {
    const handleSearch = vi.fn();

    render(<SearchInput {...defaultProps} onSearch={handleSearch} />);

    const input = screen.getByRole('textbox');

    // Enter
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    // action
    expect(handleSearch).toHaveBeenCalledTimes(1);
  });
});
