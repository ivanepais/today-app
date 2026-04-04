import { render, screen, fireEvent } from '../../../test/utils';
import { describe, it, expect, vi } from 'vitest';
import { Checkbox } from './Checkbox';
import { theme } from '../../../styles/theme';

describe('Atom: Checkbox', () => {
  it('should render correctly with a label', () => {
    render(<Checkbox checked={false} onChange={() => {}} label="Completar tarea" />);
    
    // Al ser un label que envuelve al input, Testing Library los vincula automáticamente
    expect(screen.getByLabelText(/completar tarea/i)).toBeInTheDocument();
  });

  it('should call onChange when clicked', () => {
    const handleChange = vi.fn();
    render(<Checkbox checked={false} onChange={handleChange} label="Check me" />);
    
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('should reflect the checked state', () => {
    const { rerender } = render(<Checkbox checked={true} onChange={() => {}} />);
    
    let checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(true);

    // Probamos el cambio de prop
    rerender(<Checkbox checked={false} onChange={() => {}} />);
    expect(checkbox.checked).toBe(false);
  });

  it('should apply primary color when checked', () => {
    // Aquí usamos container para buscar el StyledCheckbox ya que el input es invisible
    const { container } = render(<Checkbox checked={true} onChange={() => {}} />);
    
    // Buscamos el div que sigue al input (nuestro StyledCheckbox)
    const styledCheckbox = container.querySelector('div');
    
    expect(styledCheckbox).toHaveStyle({
      'background-color': theme.colors.primary
    });
  });

  it('should be disabled when the prop is passed', () => {
    render(<Checkbox checked={false} onChange={() => {}} disabled />);
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDisabled();
  });
});