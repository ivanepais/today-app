import { render, screen, fireEvent } from '../../../test/utils';
import { describe, it, expect, vi } from 'vitest';
import { IconButton } from './IconButton';

describe('Atom: IconButton', () => {
  it('should render the icon and use the label as aria-label', () => {
    render(<IconButton icon="🚀" label="Lanzar" />);
    
    const button = screen.getByLabelText(/lanzar/i);
    expect(button).toBeInTheDocument();
    expect(screen.getByText('🚀')).toBeInTheDocument();
  });

  it('should call onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<IconButton icon="X" label="Cerrar" onClick={handleClick} />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when the prop is passed', () => {
    render(<IconButton icon="X" label="Cerrar" disabled />);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});