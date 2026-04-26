/*
import { render, screen, fireEvent } from '../../../test/utils';
import { describe, it, expect, vi } from 'vitest';
import { TaskSearch } from './TaskSearch';

describe('Organism: TaskSearch', () => {
  const mockOnChange = vi.fn();

  it('debería renderizar los textos por defecto si no se pasan props', () => {
    render(<TaskSearch value="" onChange={mockOnChange} />);

    expect(screen.getByText('Tareas')).toBeInTheDocument();
  });

  it('renderizar título personalizado', () => {
    render(<TaskSearch value="" onChange={mockOnChange} title="Proyectos" />);

    expect(screen.getByText('Proyectos')).toBeInTheDocument();
  });

  it('debería procesar correctamente el evento de cambio y devolver solo el string', () => {
    render(<TaskSearch value="" onChange={mockOnChange} />);

    const input = screen.getByPlaceholderText(/buscar tareas.../i);

    // Simulamos que el usuario escribe "Refactor"
    fireEvent.change(input, { target: { value: 'Refactor' } });

    // Verificamos que la función recibida por props se llame con el string limpio
    expect(mockOnChange).toHaveBeenCalledWith('Refactor');
  });

  it('debería reflejar el valor pasado por la prop "value"', () => {
    render(<TaskSearch value="Valor inicial" onChange={mockOnChange} />);

    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('Valor inicial');
  });

  it('debería tener una estructura semántica de section', () => {
    const { container } = render(
      <TaskSearch value="" onChange={mockOnChange} />,
    );

    // Verificamos que el contenedor sea una etiqueta <section>
    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
  });
});
*/

/*
it('debería propagar el cambio de texto hacia el padre', () => {
  const handleChange = vi.fn();
  render(<TaskSearch value="" onChange={handleChange} />);

  const input = screen.getByRole('textbox');
  fireEvent.change(input, { target: { value: 'Limpiar código' } });

  // El test ahora es semántico: "¿Se llamó con el texto?"
  expect(handleChange).toHaveBeenCalledWith('Limpiar código');
});

it('debería propagar la acción de búsqueda al presionar Enter', () => {
  const handleSearch = vi.fn();
  render(<TaskSearch value="" onChange={() => {}} onSearch={handleSearch} />);

  const input = screen.getByRole('textbox');
  fireEvent.keyDown(input, { key: 'Enter' });

  expect(handleSearch).toHaveBeenCalledTimes(1);
});
*/

import { render, screen, fireEvent } from '../../../test/utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TaskSearch } from './TaskSearch';

describe('Organism: TaskSearch', () => {
  // Limpiamos los mocks antes de cada test para evitar interferencias
  const mockOnChange = vi.fn();
  const mockOnSearch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debería renderizar los textos por defecto y el título personalizado', () => {
    const { rerender } = render(
      <TaskSearch value="" onChange={mockOnChange} />,
    );
    expect(screen.getByText('Tareas')).toBeInTheDocument();

    rerender(<TaskSearch value="" onChange={mockOnChange} title="Proyectos" />);
    expect(screen.getByText('Proyectos')).toBeInTheDocument();
  });

  it('debería procesar el cambio de texto y devolver solo el string', () => {
    render(<TaskSearch value="" onChange={mockOnChange} />);
    const input = screen.getByPlaceholderText(/buscar tareas.../i);

    fireEvent.change(input, { target: { value: 'Refactor' } });

    expect(mockOnChange).toHaveBeenCalledWith('Refactor');
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  // Verificación de la intención de búsqueda
  it('debería ejecutar onSearch cuando el usuario presiona Enter', () => {
    render(
      <TaskSearch
        value="Mi búsqueda"
        onChange={mockOnChange}
        onSearch={mockOnSearch}
      />,
    );

    const input = screen.getByRole('textbox');

    // Simulamos la pulsación de la tecla Enter
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    // Verificamos que la acción llegó hasta el organismo
    expect(mockOnSearch).toHaveBeenCalledTimes(1);
  });

  it('debería reflejar el valor pasado por la prop "value"', () => {
    render(<TaskSearch value="Valor inicial" onChange={mockOnChange} />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('Valor inicial');
  });

  it('debería mantener la estructura semántica de <section>', () => {
    const { container } = render(
      <TaskSearch value="" onChange={mockOnChange} />,
    );
    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
  });
});
