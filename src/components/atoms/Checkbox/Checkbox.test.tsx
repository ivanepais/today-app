import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Checkbox } from './Checkbox';

describe('Atom: Checkbox', () => {
  it('should render with correct checked state', () => {
    render(<Checkbox checked={true} onChange={() => {}} label="Aceptar términos" />);
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
    expect(screen.getByText('Aceptar términos')).toBeInTheDocument();
  });

  it('should call onChange exactly once when clicked', () => {
    const handleChange = vi.fn();
    render(<Checkbox checked={false} onChange={handleChange} />);
    
    const checkbox = screen.getByRole('checkbox');
    
    // Al hacer click en un input type="checkbox", el navegador dispara el evento 'change'
    fireEvent.click(checkbox);
    
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('should be accessible via its label', () => {
    render(<Checkbox checked={false} onChange={() => {}} label="Click aquí" />);
    
    // Esto verifica que el input está correctamente asociado al texto del label
    const checkbox = screen.getByLabelText('Click aquí');
    expect(checkbox).toBeInTheDocument();
  });
});