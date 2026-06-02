import { render, screen, fireEvent } from '../../../test/utils';
import { describe, it, expect, vi } from 'vitest';
import { CategoryFilter } from './CategoryFilter';

describe('Organism: CategoryFilter', () => {
  const mockCategories = [
    { id: 'all', label: 'Todas', count: 10 },
    { id: 'work', label: 'Trabajo', count: 5 },
    { id: 'personal', label: 'Personal', count: 0 },
  ];

  const defaultProps = {
    categories: mockCategories,
    activeFilterId: 'all',
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
    const workItem = screen.getByText('Trabajo');
    fireEvent.click(workItem);

    expect(onFilterChange).toHaveBeenCalledWith('work');
  });

  it('mark as selected only the active category', () => {
    render(<CategoryFilter {...defaultProps} activeFilterId="work" />);

    // Check by rol and filter (regex)
    const workCheckbox = screen.getByRole('checkbox', {
      name: /trabajo/i,
    }) as HTMLInputElement;
    const allCheckbox = screen.getByRole('checkbox', {
      name: /todas/i,
    }) as HTMLInputElement;

    expect(workCheckbox.checked).toBe(true);
    expect(allCheckbox.checked).toBe(false);
  });

  it('show badge in active category if count > 0', () => {
    render(<CategoryFilter {...defaultProps} activeFilterId="work" />);

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
