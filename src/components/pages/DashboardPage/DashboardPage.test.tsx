import { render, screen, waitFor, fireEvent } from '../../../test/utils';
import { describe, it, expect, vi } from 'vitest';
import { DashboardPage } from './DashboardPage';

describe('Page: DashboardPage', () => {
  it('should show the loading state initially', () => {
    render(<DashboardPage />);
    
    // Verificamos que el texto de carga definido en Styled Components aparezca
    expect(screen.getByText(/iniciando sistema.../i)).toBeInTheDocument();
  });

  it('should render the dashboard content after loading data', async () => {
    render(<DashboardPage />);

    // Esperamos a que el estado de carga desaparezca y aparezcan los datos
    // Usamos findByText porque es asíncrono y reintenta hasta que aparece
    const title = await screen.findByText('Cursos Disponibles');
    expect(title).toBeInTheDocument();

    // Verificamos que una de las categorías mockeadas esté en el Sidebar
    expect(screen.getByText('Frontend')).toBeInTheDocument();
    expect(screen.getByText('Backend')).toBeInTheDocument();
  });

  it('should update the active filters count when a category is selected', async () => {
    render(<DashboardPage />);

    // 1. Esperamos a que cargue
    const categoryItem = await screen.findByText('DevOps');
    
    // 2. Verificamos que inicialmente haya 0 filtros activos
    expect(screen.getByText(/0 filtros activos/i)).toBeInTheDocument();

    // 3. Hacemos click en la categoría DevOps (esto dispara handleToggleCategory)
    fireEvent.click(categoryItem);

    // 4. El contador en el MainContent debe actualizarse a 1
    expect(screen.getByText(/1 filtros activos/i)).toBeInTheDocument();
    
    // 5. Verificamos que cambie el mensaje de ayuda
    expect(screen.getByText(/mostrando resultados personalizados.../i)).toBeInTheDocument();
  });

  it('should toggle selection off when clicking an already selected category', async () => {
    render(<DashboardPage />);

    const categoryItem = await screen.findByText('Backend');

    // Seleccionamos
    fireEvent.click(categoryItem);
    expect(screen.getByText(/1 filtros activos/i)).toBeInTheDocument();

    // Deseleccionamos
    fireEvent.click(categoryItem);
    expect(screen.getByText(/0 filtros activos/i)).toBeInTheDocument();
  });
});