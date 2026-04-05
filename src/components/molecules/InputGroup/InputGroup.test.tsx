import { render, screen, fireEvent } from '../../../test/utils';
import { describe, it, expect, vi } from 'vitest';
import { InputGroup } from './InputGroup';

describe('Molecule: InputGroup', () => {
  const mockProps = {
    label: 'Nombre de la tarea',
    value: '',
    onChange: vi.fn(),
    maxLength: 20,
    placeholder: 'Escribe aquí...',
  };

  it('should render the label and input correctly', () => {
    render(<InputGroup {...mockProps} />);
    
    expect(screen.getByText('Nombre de la tarea')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Escribe aquí...')).toBeInTheDocument();
  });

  it('should link the label with the input via id', () => {
    render(<InputGroup {...mockProps} />);
    
    const label = screen.getByText('Nombre de la tarea');
    const input = screen.getByPlaceholderText('Escribe aquí...');
    
    // Verificamos que el for del label coincida con el id del input
    expect(label).toHaveAttribute('for', input.id);
  });

  it('should NOT show the character counter when value is empty', () => {
    render(<InputGroup {...mockProps} value="" />);
    
    // El badge no debería estar presente
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('should show the correct remaining characters in the badge', () => {
    const value = 'Hola'; // 4 caracteres
    const maxLength = 20;
    const expectedRemaining = maxLength - value.length; // 16

    render(<InputGroup {...mockProps} value={value} maxLength={maxLength} />);
    
    // El Badge debería mostrar el número 16
    expect(screen.getByText(expectedRemaining.toString())).toBeInTheDocument();
  });

  it('should call onChange when the user types', () => {
    render(<InputGroup {...mockProps} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Nueva tarea' } });
    
    expect(mockProps.onChange).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when the prop is passed', () => {
    render(<InputGroup {...mockProps} disabled />);
    
    expect(screen.getByRole('textbox')).toBeDisabled();
  });
});