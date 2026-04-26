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

  it('debería renderizar el título y todas las categorías', () => {
    render(<CategoryFilter {...defaultProps} title="Mis Tareas" />);

    // Verificamos el título
    expect(screen.getByText(/mis tareas:/i)).toBeInTheDocument();

    // Verificamos que se rendericen los labels de las categorías
    mockCategories.forEach((cat) => {
      expect(screen.getByText(cat.label)).toBeInTheDocument();
    });
  });

  it('debería llamar a onFilterChange con el ID correcto al hacer clic', () => {
    const onFilterChange = vi.fn();
    render(
      <CategoryFilter {...defaultProps} onFilterChange={onFilterChange} />,
    );

    // Buscamos el item de "Trabajo" y simulamos click
    // Nota: Como FilterItem tiene el label dentro de un Checkbox, podemos buscar por el texto
    const workItem = screen.getByText('Trabajo');
    fireEvent.click(workItem);

    expect(onFilterChange).toHaveBeenCalledWith('work');
  });

  it('debería marcar como seleccionada solo la categoría activa', () => {
    render(<CategoryFilter {...defaultProps} activeFilterId="work" />);

    // Buscamos por el rol 'checkbox' y filtramos por su nombre accesible (Regex)
    const workCheckbox = screen.getByRole('checkbox', {
      name: /trabajo/i,
    }) as HTMLInputElement;
    const allCheckbox = screen.getByRole('checkbox', {
      name: /todas/i,
    }) as HTMLInputElement;

    expect(workCheckbox.checked).toBe(true);
    expect(allCheckbox.checked).toBe(false);
  });

  it('debería mostrar el Badge solo en la categoría activa si tiene conteo > 0', () => {
    render(<CategoryFilter {...defaultProps} activeFilterId="work" />);

    // El count de "work" es 5, debería verse el badge
    expect(screen.getByText('5')).toBeInTheDocument();

    // El count de "personal" es 0, no debería haber badge de personal aunque se seleccionara
    // (Siguiendo la lógica de FilterItem: isSelected && count > 0)
  });

  it('debería cumplir con la relación de accesibilidad aria-labelledby', () => {
    render(<CategoryFilter {...defaultProps} />);

    const list = screen.getByRole('list');
    const title = screen.getByText(/categorías:/i);

    // Verificamos que el ID del título coincida con el aria-labelledby de la lista
    expect(list).toHaveAttribute('aria-labelledby', title.id);
  });
});
