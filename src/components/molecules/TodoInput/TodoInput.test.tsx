import { render, screen, fireEvent } from '../../../test/utils';
import { describe, it, expect, vi } from 'vitest';
import { TodoInput } from './TodoInput';

describe('Molecule: TodoInput', () => {
  it('render with the default placeholder', () => {
    render(<TodoInput onAdd={() => {}} />);
    expect(
      screen.getByPlaceholderText(/¿qué hay que hacer hoy\?/i),
    ).toBeInTheDocument();
  });

  it('update input value when typing', () => {
    render(<TodoInput onAdd={() => {}} />);
    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: 'Nueva tarea' } });
    expect(input).toHaveValue('Nueva tarea');
  });

  it('call onAdd and clear input when submitted with valid text', () => {
    const handleAdd = vi.fn();
    render(<TodoInput onAdd={handleAdd} />);

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /añadir/i });

    // write
    fireEvent.change(input, { target: { value: 'Aprender Vitest ' } });
    // send
    fireEvent.click(button);

    // check clean (trim)
    expect(handleAdd).toHaveBeenCalledWith('Aprender Vitest');
    expect(handleAdd).toHaveBeenCalledTimes(1);

    // input empty
    expect(input).toHaveValue('');
  });

  it('disable the button if the input is empty or only whitespace', () => {
    render(<TodoInput onAdd={() => {}} />);

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /añadir/i });

    // Empty at the beginning
    expect(button).toBeDisabled();

    // Spaces only
    fireEvent.change(input, { target: { value: '   ' } });
    expect(button).toBeDisabled();
  });

  it('submit form when pressing Enter (native behavior)', () => {
    const handleAdd = vi.fn();
    render(<TodoInput onAdd={handleAdd} />);

    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: 'Tarea con Enter' } });
    // Submit form
    fireEvent.submit(screen.getByRole('form'));

    expect(handleAdd).toHaveBeenCalledWith('Tarea con Enter');
  });
});
