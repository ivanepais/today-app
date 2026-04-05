import { render, screen } from '../../../test/utils';
import { describe, it, expect } from 'vitest';
import { DashboardTemplate } from './DashboardTemplate';

describe('Template: DashboardTemplate', () => {
  const mockHeader = <div data-testid="header-slot">Header Content</div>;
  const mockSidebar = <div data-testid="sidebar-slot">Sidebar Content</div>;
  const mockContent = <div data-testid="main-slot">Main Content</div>;
  const mockFooter = <div data-testid="footer-slot">Footer Content</div>;

  it('should render header, sidebar and main content correctly', () => {
    render(
      <DashboardTemplate 
        header={mockHeader} 
        sidebar={mockSidebar}
      >
        {mockContent}
      </DashboardTemplate>
    );

    expect(screen.getByTestId('header-slot')).toBeInTheDocument();
    expect(screen.getByTestId('sidebar-slot')).toBeInTheDocument();
    expect(screen.getByTestId('main-slot')).toBeInTheDocument();
  });

  it('should render the footer only when provided', () => {
    const { rerender } = render(
      <DashboardTemplate header={mockHeader} sidebar={mockSidebar}>
        {mockContent}
      </DashboardTemplate>
    );

    // No debería haber footer inicialmente
    expect(screen.queryByRole('contentinfo')).not.toBeInTheDocument();

    // Re-renderizamos con footer
    rerender(
      <DashboardTemplate 
        header={mockHeader} 
        sidebar={mockSidebar} 
        footer={mockFooter}
      >
        {mockContent}
      </DashboardTemplate>
    );

    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getByTestId('footer-slot')).toBeInTheDocument();
  });

  it('should maintain semantic HTML structure for accessibility', () => {
    render(
      <DashboardTemplate header={mockHeader} sidebar={mockSidebar}>
        {mockContent}
      </DashboardTemplate>
    );

    // Verificamos etiquetas semánticas clave
    expect(screen.getByRole('banner')).toBeInTheDocument(); // <header>
    expect(screen.getByRole('complementary')).toBeInTheDocument(); // <aside>
    expect(screen.getByRole('main')).toBeInTheDocument(); // <main>
  });

  it('should apply the correct grid areas via styles', () => {
    const { container } = render(
      <DashboardTemplate header={mockHeader} sidebar={mockSidebar}>
        {mockContent}
      </DashboardTemplate>
    );

    const header = container.querySelector('header');
    const sidebar = container.querySelector('aside');
    const main = container.querySelector('main');

    // Verificamos que los styled-components tengan las áreas de grid asignadas
    expect(header).toHaveStyle('grid-area: header');
    expect(sidebar).toHaveStyle('grid-area: sidebar');
    expect(main).toHaveStyle('grid-area: main');
  });
});