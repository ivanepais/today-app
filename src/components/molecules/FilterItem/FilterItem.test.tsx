import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { FilterItem } from './FilterItem';

describe('Molecule: FilterItem', () => {
  const defaultProps = {
    label: 'Categoría Test',
    count: 10,
    isSelected: false,
    onToggle: vi.fn(),
  };

  it('should render the label and checkbox correctly', () => {
    render(<FilterItem {...defaultProps} />);
    
    expect(screen.getByLabelText('Categoría Test')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('should NOT show the Badge when isSelected is false', () => {
    render(<FilterItem {...defaultProps} isSelected={false} />);
    
    // queryByText devuelve null si no lo encuentra (ideal para ausencias)
    expect(screen.queryByText('10')).not.toBeInTheDocument();
  });

  it('should show the Badge when isSelected is true and count > 0', () => {
    render(<FilterItem {...defaultProps} isSelected={true} />);
    
    const badge = screen.getByText('10');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('badge-count');
  });

  it('should NOT show the Badge if count is 0, even if isSelected is true', () => {
    render(<FilterItem {...defaultProps} isSelected={true} count={0} />);
    
    // El átomo Badge devuelve null si el count es 0, la molécula lo respeta
    const badge = screen.queryByRole('generic', { name: /0 notificaciones/i });
    expect(badge).not.toBeInTheDocument();
  });

  it('should call onToggle when the checkbox is clicked', () => {
    const onToggleMock = vi.fn();
    render(<FilterItem {...defaultProps} onToggle={onToggleMock} />);
    
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    
    expect(onToggleMock).toHaveBeenCalledTimes(1);
  });
});