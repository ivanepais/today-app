import { render, screen } from '../../../test/utils';
import { describe, it, expect } from 'vitest';
import { DashboardTemplate } from './DashboardTemplate';

describe('Template: DashboardTemplate', () => {
  const mockHeader = <div data-testid="header-slot">Header Content</div>;
  const mockSidebar = <div data-testid="sidebar-slot">Sidebar Content</div>;
  const mockContent = <div data-testid="main-slot">Main Content</div>;
  const mockFooter = <div data-testid="footer-slot">Footer Content</div>;

  it('render header, sidebar and main content', () => {
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

  it('render the footer only when provided', () => {
    const { rerender } = render(
      <DashboardTemplate header={mockHeader} sidebar={mockSidebar}>
        {mockContent}
      </DashboardTemplate>
    );

    // No footer
    expect(screen.queryByRole('contentinfo')).not.toBeInTheDocument();

    // Re-render footer
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

  it('maintain semantic HTML structure for accessibility', () => {
    render(
      <DashboardTemplate header={mockHeader} sidebar={mockSidebar}>
        {mockContent}
      </DashboardTemplate>
    );

    // Check tags
    expect(screen.getByRole('banner')).toBeInTheDocument(); // <header>
    expect(screen.getByRole('complementary')).toBeInTheDocument(); // <aside>
    expect(screen.getByRole('main')).toBeInTheDocument(); // <main>
  });

  it('apply the correct grid areas via styles', () => {
    const { container } = render(
      <DashboardTemplate header={mockHeader} sidebar={mockSidebar}>
        {mockContent}
      </DashboardTemplate>
    );

    const header = container.querySelector('header');
    const sidebar = container.querySelector('aside');
    const main = container.querySelector('main');

    // Check grids
    expect(header).toHaveStyle('grid-area: header');
    expect(sidebar).toHaveStyle('grid-area: sidebar');
    expect(main).toHaveStyle('grid-area: main');
  });
});