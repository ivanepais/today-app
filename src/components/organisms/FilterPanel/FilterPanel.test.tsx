import { render, screen, fireEvent } from '../../../test/utils';
import { describe, it, expect, vi } from 'vitest';
import { FilterPanel } from './FilterPanel';

describe('Organism: FilterPanel', () => {
  const mockCategories = [
    { id: '1', label: 'Work', count: 3 },
    { id: '2', label: 'Home', count: 5 },
    { id: '3', label: 'Studies', count: 2 },
  ];

  const mockOnToggle = vi.fn();

  it('render the title and all categories initially', () => {
    render(
      <FilterPanel 
        categories={mockCategories} 
        selectedIds={['1']} 
        onToggleCategory={mockOnToggle} 
        title="My Tags"
      />
    );

    expect(screen.getByText('My Tags')).toBeInTheDocument();
    expect(screen.getByText('Work')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Studies')).toBeInTheDocument();
  });

  it('filter the list when typing in the search input', () => {
    render(
      <FilterPanel 
        categories={mockCategories} 
        selectedIds={[]} 
        onToggleCategory={mockOnToggle} 
      />
    );

    const input = screen.getByPlaceholderText(/buscar categorías.../i);
    
    // Filter
    fireEvent.change(input, { target: { value: 'Home' } });

    // "Home" must remain, "Work" must disappear
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.queryByText('Work')).not.toBeInTheDocument();
  });

  it('show the empty state when no category matches the search', () => {
    render(
      <FilterPanel 
        categories={mockCategories} 
        selectedIds={[]} 
        onToggleCategory={mockOnToggle} 
      />
    );

    const input = screen.getByPlaceholderText(/buscar categorías.../i);
    fireEvent.change(input, { target: { value: 'Inexistente' } });

    expect(screen.getByText(/no hay coincidencias para "Inexistente"/i)).toBeInTheDocument();
    expect(screen.queryByRole('list')).toBeEmptyDOMElement();
  });

  it('call onToggleCategory with the correct ID when an item is clicked', () => {
    render(
      <FilterPanel 
        categories={mockCategories} 
        selectedIds={[]} 
        onToggleCategory={mockOnToggle} 
      />
    );

    // Clic "Studies" (ID: 3)
    const categoryItem = screen.getByText('Studies');
    fireEvent.click(categoryItem);

    expect(mockOnToggle).toHaveBeenCalledWith('3');
  });

  it('identify selected categories correctly', () => {
    render(
      <FilterPanel 
        categories={mockCategories} 
        selectedIds={['2']}
        onToggleCategory={mockOnToggle} 
      />
    );

    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes[1]).toBeChecked();
    expect(checkboxes[0]).not.toBeChecked();
  });
});