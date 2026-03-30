import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { InputGroup } from './InputGroup';

describe('Molecule: InputGroup', () => {
  const defaultProps = {
    label: 'Nombre de usuario',
    value: '',
    onChange: vi.fn(),
    placeholder: 'Escribe tu nombre...',
    maxLength: 20,
  };

  it('should render the label and input correctly', () => {
    render(<InputGroup {...defaultProps} />);
    
    expect(screen.getByText('Nombre de usuario')).toBeInTheDocument();
    const input = screen.getByPlaceholderText('Escribe tu nombre...');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('');
  });

  it('should NOT show the Badge when value is empty', () => {
    render(<InputGroup {...defaultProps} value="" />);
    
    // Buscamos por el label de accesibilidad que genera el átomo Badge
    const badge = screen.queryByLabelText(/notificaciones/i);
    expect(badge).not.toBeInTheDocument();
  });

  it('should show the Badge with correct remaining count when typing', () => {
    const value = 'Gemini'; // 6 caracteres
    const maxLength = 20;
    const expectedRemaining = 14;

    render(<InputGroup {...defaultProps} value={value} maxLength={maxLength} />);
    
    // Verificamos que el Badge muestre el cálculo correcto
    const badge = screen.getByText(expectedRemaining.toString());
    expect(badge).toBeInTheDocument();
    
    // Verificamos accesibilidad (A11y) heredada del átomo
    expect(badge).toHaveAttribute('aria-label', `${expectedRemaining} notificaciones`);
  });

  it('should call onChange when the user types', () => {
    const handleChange = vi.fn();
    render(<InputGroup {...defaultProps} onChange={handleChange} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Nuevo texto' } });
    
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('should hide the Badge when the limit is reached (remaining = 0)', () => {
    const maxLength = 20;
    render(
      <InputGroup 
        {...defaultProps} 
        value="12345678901234567890" 
        maxLength={maxLength} 
      />
    );
    
    // Como remaining es 0, el Badge no debe renderizarse
    const badge = screen.queryByLabelText(/notificaciones/i);
    expect(badge).not.toBeInTheDocument();
  });
});