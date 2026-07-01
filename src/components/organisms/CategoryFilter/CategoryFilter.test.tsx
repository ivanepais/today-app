import { render, screen, fireEvent } from '../../../test/utils';
import { describe, it, expect, vi } from 'vitest';
import { CategoryFilter } from './CategoryFilter';

describe('Organism: CategoryFilter', () => {
  const mockCategories = [
    { id: 'all' as const, label: 'Todas', count: 10 },
    { id: 'pending' as const, label: 'Pendientes', count: 5 },
    { id: 'completed' as const, label: 'Completadas', count: 0 },
  ];

  const defaultProps = {
    categories: mockCategories,
    activeFilterId: 'all' as const,
    onFilterChange: vi.fn(),
  };

  it('render title and all categories', () => {
    render(<CategoryFilter {...defaultProps} title="Mis Tareas" />);

    // Check title
    expect(screen.getByText(/mis tareas:/i)).toBeInTheDocument();

    // Check label render
    mockCategories.forEach((cat) => {
      expect(screen.getByText(cat.label)).toBeInTheDocument();
    });
  });

  it('call onFilterChange with the correct id on click', () => {
    const onFilterChange = vi.fn();
    render(
      <CategoryFilter {...defaultProps} onFilterChange={onFilterChange} />,
    );

    // Item and click
    // Search by text
    const pendingItem = screen.getByText('Pendientes');
    fireEvent.click(pendingItem);

    expect(onFilterChange).toHaveBeenCalledWith('pending');
  });

  it('mark as selected only the active category', () => {
    render(<CategoryFilter {...defaultProps} activeFilterId="pending" />);

    // Check by rol and filter (regex)
    const workCheckbox = screen.getByRole('checkbox', {
      name: /pendientes/i,
    }) as HTMLInputElement;
    const allCheckbox = screen.getByRole('checkbox', {
      name: /todas/i,
    }) as HTMLInputElement;

    expect(workCheckbox.checked).toBe(true);
    expect(allCheckbox.checked).toBe(false);
  });

  it('show badge in active category if count > 0', () => {
    render(<CategoryFilter {...defaultProps} activeFilterId="pending" />);

    // Count badge
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('aria-labelledby accessibility', () => {
    render(<CategoryFilter {...defaultProps} />);

    const list = screen.getByRole('list');
    const title = screen.getByText(/categorías:/i);

    // Check id title equal to aria-labelledby of the list
    expect(list).toHaveAttribute('aria-labelledby', title.id);
  });
});
