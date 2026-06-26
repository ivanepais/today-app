import { render, screen, fireEvent } from '../../../test/utils';
import { describe, it, expect, vi } from 'vitest';
import { Input } from './Input';
import { theme } from '../../../styles/theme';

describe('Atom: Input', () => {
  const noop = () => {};

  it('render correctly with a placeholder', () => {
    const placeholderText = 'Añadir nueva tarea...';
    render(<Input value="" onChange={noop} placeholder={placeholderText} />);

    const input = screen.getByPlaceholderText(placeholderText);
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('aria-label', placeholderText);
  });

  // Verificamos el envío del string, no del evento
  it('call onChange with the new string value when the user types', () => {
    const handleChange = vi.fn();
    render(<Input value="" onChange={handleChange} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Comprar pan' } });

    // Ahora verificamos que el argumento sea exactamente el string
    expect(handleChange).toHaveBeenCalledWith('Comprar pan');
  });

  // Verificamos la abstracción de la tecla Enter
  it('call onEnter when the Enter key is pressed', () => {
    const handleEnter = vi.fn();
    render(<Input value="" onChange={noop} onEnter={handleEnter} />);

    const input = screen.getByRole('textbox');

    // Simulamos la pulsación de tecla
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', charCode: 13 });

    expect(handleEnter).toHaveBeenCalledTimes(1);
  });

  it('not call onEnter when other keys are pressed', () => {
    const handleEnter = vi.fn();
    render(<Input value="" onChange={noop} onEnter={handleEnter} />);

    const input = screen.getByRole('textbox');
    fireEvent.keyDown(input, { key: 'Escape', code: 'Escape' });

    expect(handleEnter).not.toHaveBeenCalled();
  });

  it('apply styles from theme', () => {
    render(<Input value="Test" onChange={noop} />);
    const input = screen.getByRole('textbox');

    expect(input).toHaveStyle({
      'background-color': 'rgba(255, 255, 255, 0.08)',
      color: theme.colors.textPrimary,
    });
  });

  it('display the correct value', () => {
    render(<Input value="Tarea pendiente" onChange={noop} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('Tarea pendiente');
  });

  it('disabled and apply opacity when disabled prop is true', () => {
    render(<Input value="" onChange={noop} disabled />);
    const input = screen.getByRole('textbox');

    expect(input).toBeDisabled();
    expect(input).toHaveStyle({ opacity: '0.4' });
  });
});
