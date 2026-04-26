/*
import { render, screen, fireEvent } from '../../../test/utils';
import { describe, it, expect, vi } from 'vitest';
import { Checkbox } from './Checkbox';
import { theme } from '../../../styles/theme';

describe('Atom: Checkbox', () => {
  it('should render correctly with a label', () => {
    render(
      <Checkbox checked={false} onChange={() => {}} label="Completar tarea" />,
    );

    // Al ser un label que envuelve al input, Testing Library los vincula automáticamente
    expect(screen.getByLabelText(/completar tarea/i)).toBeInTheDocument();
  });

  it('should call onChange when clicked', () => {
    const handleChange = vi.fn();
    render(
      <Checkbox checked={false} onChange={handleChange} label="Check me" />,
    );

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('should reflect the checked state', () => {
    const { rerender } = render(
      <Checkbox checked={true} onChange={() => {}} />,
    );

    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(true);

    // Probamos el cambio de prop
    rerender(<Checkbox checked={false} onChange={() => {}} />);
    expect(checkbox.checked).toBe(false);
  });

  it('should apply primary color when checked', () => {
    render(<Checkbox checked={true} onChange={() => {}} />);

    // Buscamos el div que sigue al input (nuestro StyledCheckbox)
    const styledCheckbox = screen.getByTestId('checkbox-visual');

    expect(styledCheckbox).toHaveStyle({
      'background-color': theme.colors.primary,
    });
  });

  it('should be disabled when the prop is passed', () => {
    render(<Checkbox checked={false} onChange={() => {}} disabled />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDisabled();
  });
});
*/

/*
import { render, screen, fireEvent } from '../../../test/utils';
import { describe, it, expect, vi } from 'vitest';
import { Checkbox } from './Checkbox';
import { theme } from '../../../styles/theme';

describe('Atom: Checkbox', () => {
  const noop = () => {};

  it('should render correctly with a label', () => {
    render(
      <Checkbox checked={false} onChange={noop} label="Completar tarea" />,
    );

    // Verificamos que Testing Library asocie el label con el input
    expect(screen.getByLabelText(/completar tarea/i)).toBeInTheDocument();
  });

  // Verificamos que devuelva el booleano opuesto al hacer click
  it('should call onChange with "true" when a "false" checkbox is clicked', () => {
    const handleChange = vi.fn();
    render(
      <Checkbox checked={false} onChange={handleChange} label="Check me" />,
    );

    const checkbox = screen.getByRole('checkbox');

    // El usuario hace click
    fireEvent.click(checkbox);

    // Verificamos que el contrato se cumpla: el padre recibe el nuevo estado
    expect(handleChange).toHaveBeenCalledWith(true);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('should call onChange with "false" when a "true" checkbox is clicked', () => {
    const handleChange = vi.fn();
    render(
      <Checkbox checked={true} onChange={handleChange} label="Uncheck me" />,
    );

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(handleChange).toHaveBeenCalledWith(false);
  });

  it('should reflect the checked state correctly', () => {
    const { rerender } = render(<Checkbox checked={true} onChange={noop} />);
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;

    expect(checkbox.checked).toBe(true);

    // Probamos el cambio de prop (React reactivity)
    rerender(<Checkbox checked={false} onChange={noop} />);
    expect(checkbox.checked).toBe(false);
  });

  it('should apply primary color styles when checked', () => {
    render(<Checkbox checked={true} onChange={noop} />);

    // El StyledCheckbox tiene el data-testid para facilitar esto
    const styledCheckbox = screen.getByTestId('checkbox-visual');

    expect(styledCheckbox).toHaveStyle({
      'background-color': theme.colors.primary,
    });
  });

  it('should be disabled and not allow interaction', () => {
    const handleChange = vi.fn();
    render(<Checkbox checked={false} onChange={handleChange} disabled />);

    const checkbox = screen.getByRole('checkbox');

    expect(checkbox).toBeDisabled();

    // Intentamos clickear aunque esté deshabilitado
    fireEvent.click(checkbox);
    expect(handleChange).not.toHaveBeenCalled();
  });
});

*/

import { render, screen, fireEvent } from '../../../test/utils';
import { describe, it, expect, vi } from 'vitest';
import { Checkbox } from './Checkbox';
import { theme } from '../../../styles/theme';

describe('Atom: Checkbox', () => {
  const noop = () => {};
  const defaultId = 'test-checkbox';

  it('debería renderizar correctamente y estar vinculado a su etiqueta', () => {
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
    // Verificación técnica de la conexión HTML nativa
    expect(label).toHaveAttribute('for', defaultId);
    expect(checkbox).toHaveAttribute('id', defaultId);
  });

  it('debería llamar a onChange con el valor booleano correcto al hacer click', () => {
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

    // El usuario hace click en el input (o el label)
    fireEvent.click(checkbox);

    expect(handleChange).toHaveBeenCalledWith(true);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('debería reflejar los cambios de estado de la prop "checked"', () => {
    const { rerender } = render(
      <Checkbox id={defaultId} checked={true} onChange={noop} />,
    );

    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(true);

    // React reactivity test
    rerender(<Checkbox id={defaultId} checked={false} onChange={noop} />);
    expect(checkbox.checked).toBe(false);
  });

  it('debería aplicar estilos de "cristal" y colores del tema según el estado', () => {
    const { rerender } = render(
      <Checkbox id={defaultId} checked={true} onChange={noop} />,
    );

    const styledCheckbox = screen.getByTestId('checkbox-visual');
    expect(styledCheckbox).toHaveStyle({
      'background-color': theme.colors.primary,
    });

    rerender(<Checkbox id={defaultId} checked={false} onChange={noop} />);
    // Cuando no está seleccionado, debería tener el fondo transparente/cristal
    expect(styledCheckbox).toHaveStyle({
      'background-color': 'oklch(100% 0 0 / 5%)',
    });
  });

  it('debería estar deshabilitado y bloquear la interacción', () => {
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
