import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { FilterPanel } from './FilterPanel';

describe('Organism: FilterPanel', () => {
  const mockCategories = [
    { id: '1', label: 'React', count: 12 },
  ];

  it('should find the Badge using its accessible label when selected', () => {
    render(
      <FilterPanel 
        categories={mockCategories} 
        selectedIds={['1']} // React seleccionado
        onToggleCategory={vi.fn()} 
      />
    );

    // En lugar de screen.getByText('12'), usamos el label del átomo Badge
    const badge = screen.getByLabelText(/12 notificaciones/i);
    expect(badge).toBeInTheDocument();
  });

  it('should not find any Badge when no categories are selected', () => {
    render(
      <FilterPanel 
        categories={mockCategories} 
        selectedIds={[]} // Nada seleccionado
        onToggleCategory={vi.fn()} 
      />
    );

    // queryByLabelText es perfecto aquí: si no lo encuentra, devuelve null sin fallar
    const badge = screen.queryByLabelText(/notificaciones/i);
    expect(badge).not.toBeInTheDocument();
  });

  it('should provide correct context for the empty state', () => {
    render(
      <FilterPanel 
        categories={mockCategories} 
        selectedIds={[]} 
        onToggleCategory={vi.fn()} 
      />
    );

    const input = screen.getByRole('textbox', { name: /filtrar por nombre/i });
    fireEvent.change(input, { target: { value: 'Vue' } });

    // Verificamos que el mensaje de "No hay coincidencias" tenga el rol status
    // Esto avisa a los lectores de pantalla que el contenido cambió
    const statusMessage = screen.getByRole('status');
    expect(statusMessage).toHaveTextContent(/no hay coincidencias/i);
  });
});