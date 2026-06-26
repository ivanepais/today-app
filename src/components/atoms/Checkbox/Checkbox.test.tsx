import { render, screen, fireEvent } from '../../../test/utils';
import { describe, it, expect, vi } from 'vitest';
import { Checkbox } from './Checkbox';
import { theme } from '../../../styles/theme';

describe('Atom: Checkbox', () => {
  const noop = () => {};
  const defaultId = 'test-checkbox';

  it('render and linked tag', () => {
    render(
      <Checkbox
        id={defaultId}
        checked={false}
        onChange={noop}
        label="Completar tarea"
      />,
    );

    // ID encontrar esta asociación
    const label = screen.getByText(/completar tarea/i);
    const checkbox = screen.getByRole('checkbox');

    expect(label).toBeInTheDocument();
    // Verify native HTML connection
    expect(label).toHaveAttribute('for', defaultId);
    expect(checkbox).toHaveAttribute('id', defaultId);
  });

  it('call onChange with the correct boolean on click', () => {
    const handleChange = vi.fn();
    render(
      <Checkbox
        id={defaultId}
        checked={false}
        onChange={handleChange}
        label="Check me"
      />,
    );

    const checkbox = screen.getByRole('checkbox');

    // user clicks on the input (or the label)
    fireEvent.click(checkbox);

    expect(handleChange).toHaveBeenCalledWith(true);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('state changes of the checked prop', () => {
    const { rerender } = render(
      <Checkbox id={defaultId} checked={true} onChange={noop} />,
    );

    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(true);

    rerender(<Checkbox id={defaultId} checked={false} onChange={noop} />);
    expect(checkbox.checked).toBe(false);
  });

  it('apply styles according to the state', () => {
    const { rerender } = render(
      <Checkbox id={defaultId} checked={true} onChange={noop} />,
    );

    const styledCheckbox = screen.getByTestId('checkbox-visual');
    expect(styledCheckbox).toHaveStyle({
      'background-color': theme.colors.primary,
    });

    rerender(<Checkbox id={defaultId} checked={false} onChange={noop} />);
    // When not selected, apply style.
    expect(styledCheckbox).toHaveStyle({
      'background-color': 'rgba(255,255,255,0.05)',
    });
  });

  it('should be disabled and block interaction', () => {
    const handleChange = vi.fn();
    render(
      <Checkbox
        id={defaultId}
        checked={false}
        onChange={handleChange}
        disabled
      />,
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDisabled();

    fireEvent.click(checkbox);
    expect(handleChange).not.toHaveBeenCalled();
  });
});
