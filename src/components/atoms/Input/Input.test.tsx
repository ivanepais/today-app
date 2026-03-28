import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Input } from './Input';

describe('Atom: Input', () => {
  it('should render with the correct placeholder', () => {
    render(<Input value="" onChange={() => {}} placeholder="Nueva tarea..." />);
    
    // Buscamos por el rol de accesibilidad que definimos en el JSX
    const inputElement = screen.getByPlaceholderText(/nueva tarea.../i);
    expect(inputElement).toBeInTheDocument();
  });

  it('should call onChange when the user types', () => {
    const handleChange = vi.fn();
    render(<Input value="" onChange={handleChange} />);
    
    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: 'Comprar pan' } });
    
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('should trigger onKeyDown when a key is pressed', () => {
    const handleKeyDown = vi.fn();
    render(<Input value="" onChange={() => {}} onKeyDown={handleKeyDown} />);
    
    const inputElement = screen.getByRole('textbox');
    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });
    
    expect(handleKeyDown).toHaveBeenCalled();
  });
});