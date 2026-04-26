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

  it('debería renderizar el buscador y el filtro de categorías', () => {
    render(<TaskSidebar {...mockProps} />);

    // Verificamos que ambos sub-componentes están presentes
    expect(screen.getByPlaceholderText(/buscar tareas/i)).toBeInTheDocument();
    expect(screen.getByText(/categorías/i)).toBeInTheDocument();
  });

  it('debería propagar los cambios del buscador al llamar a onSearchChange', () => {
    render(<TaskSidebar {...mockProps} />);

    const input = screen.getByPlaceholderText(/buscar tareas/i);
    fireEvent.change(input, { target: { value: 'Nueva tarea' } });

    expect(mockProps.onSearchChange).toHaveBeenCalledWith('Nueva tarea');
  });

  it('debería propagar el cambio de filtro al hacer clic en una categoría', () => {
    render(<TaskSidebar {...mockProps} />);

    // Usamos el rol de checkbox con regex para evitar el "ruido" del badge
    const personalFilter = screen.getByRole('checkbox', { name: /personal/i });
    fireEvent.click(personalFilter);

    expect(mockProps.onFilterChange).toHaveBeenCalledWith('personal');
  });

  it('debería mostrar el estado de selección correcto basado en activeFilterId', () => {
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
