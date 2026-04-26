/*
import { render, screen, fireEvent } from '../../../test/utils';
import { describe, it, expect, vi } from 'vitest';
import { SearchInput } from './SearchInput';

describe('Molecule: SearchInput', () => {
  const defaultProps = {
    value: '',
    onChange: vi.fn(),
    placeholder: 'Buscar tarea...'
  };

  it('debería renderizar el icono y el input con su placeholder', () => {
    render(<SearchInput {...defaultProps} />);
    
    // Verificamos el input por su accesibilidad (aria-label definido en el átomo)
    const input = screen.getByPlaceholderText(/buscar tarea/i);
    expect(input).toBeInTheDocument();

    // Verificamos que el icono visual esté presente
    expect(screen.getByText('🔍')).toBeInTheDocument();
  });

  it('debería propagar los cambios al escribir', () => {
    const handleChange = vi.fn();
    render(<SearchInput {...defaultProps} onChange={handleChange} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Nueva tarea' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('el icono no debe bloquear la interacción del mouse', () => {
    render(<SearchInput {...defaultProps} />);
    
    const icon = screen.getByText('🔍');
    
    // Verificamos que tenga pointer-events: none a nivel de estilo
    // Esto es crítico para que el click pase al input de abajo
    expect(icon).toHaveStyle({ 'pointer-events': 'none' });
  });
});
*/

import { render, screen, fireEvent } from '../../../test/utils';
import { describe, it, expect, vi } from 'vitest';
import { SearchInput } from './SearchInput';

describe('Molecule: SearchInput', () => {
  const defaultProps = {
    value: '',
    onChange: vi.fn(),
    placeholder: 'Buscar tarea...',
  };

  it('debería renderizar el icono y el input con su placeholder', () => {
    render(<SearchInput {...defaultProps} />);

    const input = screen.getByPlaceholderText(/buscar tarea/i);
    expect(input).toBeInTheDocument();
    expect(screen.getByText('🔍')).toBeInTheDocument();
  });

  it('debería propagar el valor como STRING al escribir', () => {
    const handleChange = vi.fn();
    render(<SearchInput {...defaultProps} onChange={handleChange} />);

    const input = screen.getByRole('textbox');

    // Simulamos el evento del DOM
    fireEvent.change(input, { target: { value: 'Nueva tarea' } });

    // Verificamos que la molécula entregue el dato limpio
    // Si la comunicación fallara (ej. si pasara el evento por error), esto fallaría.
    expect(handleChange).toHaveBeenCalledWith('Nueva tarea');
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('el icono no debe bloquear la interacción del mouse', () => {
    render(<SearchInput {...defaultProps} />);
    const icon = screen.getByText('🔍');

    // Esto asegura que al hacer click en la lupa, el foco vaya al input
    expect(icon).toHaveStyle({ 'pointer-events': 'none' });
  });

  // Opcional: Test de accesibilidad
  it('debería tener las etiquetas de accesibilidad correctas', () => {
    render(<SearchInput {...defaultProps} />);
    const icon = screen.getByLabelText('Icono de búsqueda');
    expect(icon).toHaveAttribute('role', 'img');
  });

  it('debería llamar a onSearch cuando se presiona Enter en el input', () => {
    const handleSearch = vi.fn();

    render(<SearchInput {...defaultProps} onSearch={handleSearch} />);

    const input = screen.getByRole('textbox');

    // Simulamos la tecla Enter
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    // Verificamos que la molécula propagó la acción correctamente
    expect(handleSearch).toHaveBeenCalledTimes(1);
  });
});
