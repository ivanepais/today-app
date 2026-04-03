import { render, screen, fireEvent } from '../../../test/utils';
import { describe, it, expect, vi } from 'vitest';
import { TodoInput } from './TodoInput';

describe('Molecule: TodoInput', () => {
  it('should render with the default placeholder', () => {
    render(<TodoInput onAdd={() => {}} />);
    expect(screen.getByPlaceholderText(/¿qué hay que hacer hoy\?/i)).toBeInTheDocument();
  });

  it('should update input value when typing', () => {
    render(<TodoInput onAdd={() => {}} />);
    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: 'Nueva tarea' } });
    expect(input).toHaveValue('Nueva tarea');
  });

  it('should call onAdd and clear input when submitted with valid text', () => {
    const handleAdd = vi.fn();
    render(<TodoInput onAdd={handleAdd} />);
    
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /añadir/i });

    //escribimos
    fireEvent.change(input, { target: { value: 'Aprender Vitest ' } }); // Con espacio al final
    //enviamos
    fireEvent.click(button);

    // Verificamos que se llamó con el texto limpio (trim)
    expect(handleAdd).toHaveBeenCalledWith('Aprender Vitest');
    expect(handleAdd).toHaveBeenCalledTimes(1);
    
    // El input debe quedar vacío para la siguiente tarea
    expect(input).toHaveValue('');
  });

  it('should disable the button if the input is empty or only whitespace', () => {
    render(<TodoInput onAdd={() => {}} />);
    
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /añadir/i });

    // Caso 1: Vacío al inicio
    expect(button).toBeDisabled();

    // Caso 2: Solo espacios
    fireEvent.change(input, { target: { value: '   ' } });
    expect(button).toBeDisabled();
  });

  it('should submit form when pressing Enter (native behavior)', () => {
    const handleAdd = vi.fn();
    render(<TodoInput onAdd={handleAdd} />);
    
    const input = screen.getByRole('textbox');
    
    fireEvent.change(input, { target: { value: 'Tarea con Enter' } });
    // Simulamos el submit del formulario completo
    fireEvent.submit(screen.getByRole('form')); 

    expect(handleAdd).toHaveBeenCalledWith('Tarea con Enter');
  });
});