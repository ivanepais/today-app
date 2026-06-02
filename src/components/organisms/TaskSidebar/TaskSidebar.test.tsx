import { render, screen, fireEvent } from '../../../test/utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TaskSidebar } from './TaskSidebar';

describe('Organism: TaskSidebar', () => {
  const mockCategories = [
    { id: 'work', label: 'Trabajo', count: 10 },
    { id: 'personal', label: 'Personal', count: 5 },
  ];

  const mockProps = {
    searchQuery: '',
    onSearchChange: vi.fn(),
    categories: mockCategories,
    activeFilterId: 'work',
    onFilterChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('render search and category', () => {
    render(<TaskSidebar {...mockProps} />);

    // Check components
    expect(screen.getByPlaceholderText(/buscar.../i)).toBeInTheDocument();
    expect(screen.getByText(/categorías/i)).toBeInTheDocument();
  });

  it('propagate search engine changes by calling onSearchChange', () => {
    render(<TaskSidebar {...mockProps} />);

    const input = screen.getByPlaceholderText(/buscar.../i);
    fireEvent.change(input, { target: { value: 'Nueva tarea' } });

    expect(mockProps.onSearchChange).toHaveBeenCalledWith('Nueva tarea');
  });

  it('propagate the filter change when clicking on a category', () => {
    render(<TaskSidebar {...mockProps} />);

    // Rol checkbox
    const personalFilter = screen.getByRole('checkbox', { name: /personal/i });
    fireEvent.click(personalFilter);

    expect(mockProps.onFilterChange).toHaveBeenCalledWith('personal');
  });

  it('display selection status based on activeFilterId', () => {
    render(<TaskSidebar {...mockProps} activeFilterId="work" />);

    const workCheckbox = screen.getByRole('checkbox', {
      name: /trabajo/i,
    }) as HTMLInputElement;
    const personalCheckbox = screen.getByRole('checkbox', {
      name: /personal/i,
    }) as HTMLInputElement;

    expect(workCheckbox.checked).toBe(true);
    expect(personalCheckbox.checked).toBe(false);
  });
});
