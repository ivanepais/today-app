import { render, screen, fireEvent } from '../../../test/utils';
import { describe, it, expect, vi } from 'vitest';
import { FilterItem } from './FilterItem';

describe('Molecule: FilterItem', () => {
  const mockProps = {
    label: 'Pendientes',
    count: 5,
    isSelected: false,
    onToggle: vi.fn(),
  };

  it('should render the label and checkbox correctly', () => {
    render(<FilterItem {...mockProps} />);
    
    expect(screen.getByText('Pendientes')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('should NOT render the badge if isSelected is false', () => {
    render(<FilterItem {...mockProps} isSelected={false} />);
    
    // Buscamos por el texto del count (5)
    expect(screen.queryByText('5')).not.toBeInTheDocument();
  });

  it('should render the badge if isSelected is true and count > 0', () => {
    render(<FilterItem {...mockProps} isSelected={true} />);
    
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('should NOT render the badge if count is 0 even if selected', () => {
    render(<FilterItem {...mockProps} isSelected={true} count={0} />);
    
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('should call onToggle when the container is clicked', () => {
    render(<FilterItem {...mockProps} />);
    
    // Al ser un div con un onClick que envuelve al checkbox
    const container = screen.getByText('Pendientes').closest('div');
    if (container) fireEvent.click(container);

    expect(mockProps.onToggle).toHaveBeenCalledTimes(1);
  });

  it('should show the overflow count in the badge if exceeds limit', () => {
    render(<FilterItem {...mockProps} isSelected={true} count={1500} />);
    
    // Habíamos puesto overflowCount={999} en el componente
    expect(screen.getByText('999+')).toBeInTheDocument();
  });
});