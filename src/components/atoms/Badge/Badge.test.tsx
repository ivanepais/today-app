import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Badge } from './Badge';

describe('Atom: Badge', () => {
  it('should not render anything if count is 0', () => {
    const { container } = render(<Badge count={0} />);
    // Verificamos que el DOM esté vacío (null en el componente)
    expect(container.firstChild).toBeNull();
  });

  it('should not render anything if count is negative', () => {
    const { container } = render(<Badge count={-5} />);
    expect(container.firstChild).toBeNull();
  });

  it('should render the exact count if it is less than or equal to overflowCount', () => {
    render(<Badge count={50} />);
    const badge = screen.getByText('50');
    expect(badge).toBeInTheDocument();
    // Verificamos el aria-label para accesibilidad
    expect(badge).toHaveAttribute('aria-label', '50 notificaciones');
  });

  it('should render "99+" if count exceeds the default overflowCount (99)', () => {
    render(<Badge count={150} />);
    expect(screen.getByText('99+')).toBeInTheDocument();
    // Importante: el aria-label debe mantener el número real para lectores de pantalla
    const badge = screen.getByLabelText('150 notificaciones');
    expect(badge).toBeInTheDocument();
  });

  it('should respect a custom overflowCount prop', () => {
    render(<Badge count={15} overflowCount={10} />);
    expect(screen.getByText('10+')).toBeInTheDocument();
    expect(screen.getByLabelText('15 notificaciones')).toBeInTheDocument();
  });
});