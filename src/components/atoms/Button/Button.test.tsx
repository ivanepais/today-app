import { render, screen, fireEvent } from '../../../test/utils';
import { describe, it, expect, vi } from 'vitest';
import { Button } from './Button';
import { theme } from '../../../styles/theme';

describe('Atom: Button', () => {
  it('should render children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('should call onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Action</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should apply primary styles by default', () => {
    render(<Button>Primary</Button>);
    const button = screen.getByRole('button');
    
    // Verificamos el color principal de nuestro theme OKLCH
    expect(button).toHaveStyle({
      'background-color': theme.colors.primary,
      'color': theme.colors.background
    });
  });

  it('should render icons if provided', () => {
    render(
      <Button 
        leftIcon={<span data-testid="left-icon">👈</span>}
        rightIcon={<span data-testid="right-icon">👉</span>}
      >
        With Icons
      </Button>
    );

    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });

  it('should apply 100% width when fullWidth is true', () => {
    render(<Button fullWidth>Wide Button</Button>);
    const button = screen.getByRole('button');
    
    expect(button).toHaveStyle({ width: '100%' });
  });

  it('should not call onClick and have lower opacity when disabled', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick} disabled>Disabled</Button>);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(handleClick).not.toHaveBeenCalled();
    expect(button).toHaveStyle({ opacity: '0.5' });
  });
});