import { render, screen } from '../../../test/utils';
import { describe, it, expect } from 'vitest';
import { Badge } from './Badge';
import { theme } from '../../../styles/theme';

describe('Atom: Badge', () => {
  it('should render the correct count', () => {
    render(<Badge count={5} />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('should render the overflow count when exceeded', () => {
    render(<Badge count={150} overflowCount={99} />);
    expect(screen.getByText('99+')).toBeInTheDocument();
  });

  it('should not render anything if count is 0 or negative', () => {
    const { container } = render(<Badge count={0} />);
    expect(container.firstChild).toBeNull();
  });

  it('should have the correct primary styles from theme', () => {
    render(<Badge count={1} />);
    const badge = screen.getByRole('status');

    expect(badge).toHaveStyle({
      'background-color': theme.colors.primary,
      'color': theme.colors.background,
      'border-radius': theme.borderRadius.full
    });
  });

  it('should have accessibility labels', () => {
    render(<Badge count={10} />);
    expect(screen.getByLabelText(/10 notificaciones/i)).toBeInTheDocument();
  });
});