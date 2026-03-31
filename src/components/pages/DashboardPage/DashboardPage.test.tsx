import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { DashboardPage } from './DashboardPage';

describe('Page: DashboardPage', () => {
  
  it('should show a loading state initially', () => {
    render(<DashboardPage />);
    expect(screen.getByText(/cargando sistema/i)).toBeInTheDocument();
  });

  it('should render categories after fetching data', async () => {
    render(<DashboardPage />);

    // 'findBy' es asíncrono: espera hasta que el elemento aparezca (timeout por defecto 1s)
    const categoryItem = await screen.findByText('Frontend');
    
    expect(categoryItem).toBeInTheDocument();
    expect(screen.getByText('Backend')).toBeInTheDocument();
    expect(screen.queryByText(/cargando sistema/i)).not.toBeInTheDocument();
  });

  it('should update the results count when a category is selected', async () => {
    render(<DashboardPage />);

    // 1. Esperamos a que carguen los datos
    const checkbox = await screen.findByLabelText(/Frontend/i);
    
    // 2. Verificamos estado inicial del contador en la zona de contenido
    expect(screen.getByText(/Resultados \(0 filtros activos\)/i)).toBeInTheDocument();

    // 3. El usuario interactúa
    fireEvent.click(checkbox);

    // 4. La página debe haber reaccionado al evento del organismo
    expect(screen.getByText(/Resultados \(1 filtros activos\)/i)).toBeInTheDocument();
    
    // 5. El badge de la molécula también debería aparecer (Integración total)
    expect(screen.getByLabelText(/45 notificaciones/i)).toBeInTheDocument();
  });

  it('should filter categories correctly using the search input', async () => {
    render(<DashboardPage />);

    // Esperamos carga
    await screen.findByText('Frontend');

    const searchInput = screen.getByPlaceholderText('Buscar...');
    fireEvent.change(searchInput, { target: { value: 'DevOps' } });

    // Verificamos que la lógica de filtrado del Organismo dentro de la Página funcione
    expect(screen.getByText('DevOps')).toBeInTheDocument();
    expect(screen.queryByText('Frontend')).not.toBeInTheDocument();
  });
});