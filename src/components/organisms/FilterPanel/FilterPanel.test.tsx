import { render, screen, fireEvent } from '../../../test/utils';
import { describe, it, expect, vi } from 'vitest';
import { FilterPanel } from './FilterPanel';

describe('Organism: FilterPanel', () => {
  const mockCategories = [
    { id: '1', label: 'Trabajo', count: 3 },
    { id: '2', label: 'Hogar', count: 5 },
    { id: '3', label: 'Estudios', count: 2 },
  ];

  const mockOnToggle = vi.fn();

  it('should render the title and all categories initially', () => {
    render(
      <FilterPanel 
        categories={mockCategories} 
        selectedIds={['1']} 
        onToggleCategory={mockOnToggle} 
        title="Mis Etiquetas"
      />
    );

    expect(screen.getByText('Mis Etiquetas')).toBeInTheDocument();
    expect(screen.getByText('Trabajo')).toBeInTheDocument();
    expect(screen.getByText('Hogar')).toBeInTheDocument();
    expect(screen.getByText('Estudios')).toBeInTheDocument();
  });

  it('should filter the list when typing in the search input', () => {
    render(
      <FilterPanel 
        categories={mockCategories} 
        selectedIds={[]} 
        onToggleCategory={mockOnToggle} 
      />
    );

    const input = screen.getByPlaceholderText(/buscar categorías.../i);
    
    // Filtramos por "Hogar"
    fireEvent.change(input, { target: { value: 'Hogar' } });

    // "Hogar" debe seguir ahí, pero "Trabajo" debe desaparecer
    expect(screen.getByText('Hogar')).toBeInTheDocument();
    expect(screen.queryByText('Trabajo')).not.toBeInTheDocument();
  });

  it('should show the empty state when no category matches the search', () => {
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

  it('should call onToggleCategory with the correct ID when an item is clicked', () => {
    render(
      <FilterPanel 
        categories={mockCategories} 
        selectedIds={[]} 
        onToggleCategory={mockOnToggle} 
      />
    );

    // Hacemos click en la categoría "Estudios" (ID: 3)
    const categoryItem = screen.getByText('Estudios');
    fireEvent.click(categoryItem);

    expect(mockOnToggle).toHaveBeenCalledWith('3');
  });

  it('should identify selected categories correctly', () => {
    render(
      <FilterPanel 
        categories={mockCategories} 
        selectedIds={['2']} // Marcamos "Hogar"
        onToggleCategory={mockOnToggle} 
      />
    );

    const checkboxes = screen.getAllByRole('checkbox');
    // El segundo item (Hogar) debería estar marcado
    expect(checkboxes[1]).toBeChecked();
    expect(checkboxes[0]).not.toBeChecked();
  });
});