import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { IconButton } from './IconButton';

describe('Atom: IconButton', () => {
  it('should render the icon correctly', () => {
    // Usamos un componente simple como icono para la prueba
    const TestIcon = () => <span data-testid="test-icon">X</span>;
    render(<IconButton icon={<TestIcon />} onClick={() => {}} label="Cerrar" />);
    
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });

  it('should have the correct aria-label for screen readers', () => {
    const myLabel = 'Eliminar tarea';
    render(<IconButton icon="🗑️" onClick={() => {}} label={myLabel} />);
    
    // getByLabelText verifica que el aria-label exista y coincida
    const button = screen.getByLabelText(myLabel);
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-label', myLabel);
  });

  it('should call onClick when the button is pressed', () => {
    const handleClick = vi.fn();
    render(<IconButton icon="+" onClick={handleClick} label="Añadir" />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should not call onClick when the button is disabled', () => {
    const handleClick = vi.fn();
    render(
      <IconButton 
        icon="+" 
        onClick={handleClick} 
        label="Añadir" 
        disabled={true} 
      />
    );
    
    const button = screen.getByRole('button');
    
    // Verificamos el atributo HTML 'disabled'
    expect(button).toBeDisabled();
    
    // Intentamos hacer clic
    fireEvent.click(button);
    
    // La función no debería haber sido llamada
    expect(handleClick).not.toHaveBeenCalled();
  });
});