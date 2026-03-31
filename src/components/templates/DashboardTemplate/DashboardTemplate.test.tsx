import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { DashboardTemplate } from './DashboardTemplate';

describe('Template: DashboardTemplate', () => {
  const MockHeader = () => <div data-testid="header-mock">Header</div>;
  const MockSidebar = () => <div data-testid="sidebar-mock">Sidebar</div>;
  const MockContent = () => <div data-testid="content-mock">Main Content</div>;
  const MockFooter = () => <div data-testid="footer-mock">Footer</div>;

  it('should render header, sidebar and main content in their semantic regions', () => {
    render(
      <DashboardTemplate 
        header={<MockHeader />} 
        sidebar={<MockSidebar />}
      >
        <MockContent />
      </DashboardTemplate>
    );

    // Verificamos por ROLES semánticos (Landmarks)
    expect(screen.getByRole('banner')).toContainElement(screen.getByTestId('header-mock'));
    expect(screen.getByRole('complementary')).toContainElement(screen.getByTestId('sidebar-mock'));
    expect(screen.getByRole('main')).toContainElement(screen.getByTestId('content-mock'));
  });

  it('should not render a footer if the prop is not provided', () => {
    render(
      <DashboardTemplate header={<MockHeader />} sidebar={<MockSidebar />}>
        <MockContent />
      </DashboardTemplate>
    );

    // 'contentinfo' es el rol por defecto de la etiqueta <footer>
    expect(screen.queryByRole('contentinfo')).not.toBeInTheDocument();
  });

  it('should render the footer when provided', () => {
    render(
      <DashboardTemplate 
        header={<MockHeader />} 
        sidebar={<MockSidebar />}
        footer={<MockFooter />}
      >
        <MockContent />
      </DashboardTemplate>
    );

    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
    expect(footer).toContainElement(screen.getByTestId('footer-mock'));
  });

  it('should maintain the correct layout flow (Sidebar then Main)', () => {
    const { container } = render(
      <DashboardTemplate header={<MockHeader />} sidebar={<MockSidebar />}>
        <MockContent />
      </DashboardTemplate>
    );

    const bodyContainer = container.querySelector('.template-body');
    
    // Verificamos que el orden de los hijos en el DOM sea el esperado para el layout
    expect(bodyContainer?.firstElementChild).toHaveClass('template-sidebar');
    expect(bodyContainer?.lastElementChild).toHaveClass('template-main-content');
  });
});