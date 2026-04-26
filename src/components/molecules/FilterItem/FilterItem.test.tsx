/*
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
*/

import { render, screen, fireEvent } from '../../../test/utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { FilterItem } from './FilterItem';

describe('Molecule: FilterItem', () => {
  const mockProps = {
    label: 'Pendientes',
    count: 5,
    isSelected: false,
    onToggle: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debería renderizar el label y el checkbox vinculados correctamente', () => {
    render(<FilterItem {...mockProps} />);

    // 1. Buscamos el texto, pero luego subimos hasta encontrar el elemento <label>
    const labelContainer = screen.getByText('Pendientes').closest('label');
    const checkbox = screen.getByRole('checkbox');

    expect(labelContainer).toBeInTheDocument();

    // 2. El labelContainer es el <label> y tiene el atributo 'for'
    expect(checkbox).toHaveAttribute('id', labelContainer?.getAttribute('for'));
    expect(checkbox).not.toBeChecked();
  });

  it('el badge debería estar oculto (pero en el DOM) si isSelected es false', () => {
    render(<FilterItem {...mockProps} isSelected={false} />);

    const badge = screen.getByText('5');

    // IMPORTANTE: Ahora usamos toBeVisible() en lugar de toBeInTheDocument()
    // porque el componente existe para poder animarse, pero no debe verse.
    expect(badge).not.toBeVisible();
  });

  it('el badge debería ser visible si isSelected es true', () => {
    render(<FilterItem {...mockProps} isSelected={true} />);

    const badge = screen.getByText('5');
    expect(badge).toBeVisible();
  });

  it('NO debería renderizar el badge en absoluto si el count es 0', () => {
    render(<FilterItem {...mockProps} isSelected={true} count={0} />);

    // Aquí sí usamos queryByText porque el cortocircuito {count > 0 && ...}
    // elimina el elemento del DOM completamente.
    expect(screen.queryByText('0')).not.toBeInTheDocument();
  });

  it('debería llamar a onToggle al hacer click en el label (toda la fila)', () => {
    render(<FilterItem {...mockProps} />);

    // Al ser un <label>, hacer click en el texto dispara el checkbox automáticamente
    fireEvent.click(screen.getByText('Pendientes'));

    expect(mockProps.onToggle).toHaveBeenCalledTimes(1);
  });

  it('debería mostrar el conteo con overflow si excede el límite', () => {
    render(<FilterItem {...mockProps} isSelected={true} count={1500} />);
    expect(screen.getByText('999+')).toBeVisible();
  });
});
