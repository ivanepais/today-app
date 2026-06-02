import { render, screen, waitFor, fireEvent } from '../../../test/utils';
import { describe, it, expect, vi } from 'vitest';
import { DashboardPage } from './DashboardPage';

describe('Page: DashboardPage', () => {
  it('show the loading state initially', () => {
    render(<DashboardPage />);
    
    // Check txt
    expect(screen.getByText(/iniciando sistema.../i)).toBeInTheDocument();
  });

  it('render the dashboard content after loading data', async () => {
    render(<DashboardPage />);

    // Hide, show data
    // findByText async
    const title = await screen.findByText('Cursos Disponibles');
    expect(title).toBeInTheDocument();

    // Check categories
    expect(screen.getByText('Frontend')).toBeInTheDocument();
    expect(screen.getByText('Backend')).toBeInTheDocument();
  });

  it('update the active filters count when a category is selected', async () => {
    render(<DashboardPage />);

    // Load
    const categoryItem = await screen.findByText('DevOps');
    
    // Check cero filter
    expect(screen.getByText(/0 filtros activos/i)).toBeInTheDocument();

    // Click DevOps (handleToggleCategory)
    fireEvent.click(categoryItem);

    // Counter 1
    expect(screen.getByText(/1 filtros activos/i)).toBeInTheDocument();
    
    // Check message
    expect(screen.getByText(/mostrando resultados personalizados.../i)).toBeInTheDocument();
  });

  it('toggle selection off when clicking an already selected category', async () => {
    render(<DashboardPage />);

    const categoryItem = await screen.findByText('Backend');

    // Select
    fireEvent.click(categoryItem);
    expect(screen.getByText(/1 filtros activos/i)).toBeInTheDocument();

    // Deselect
    fireEvent.click(categoryItem);
    expect(screen.getByText(/0 filtros activos/i)).toBeInTheDocument();
  });
});