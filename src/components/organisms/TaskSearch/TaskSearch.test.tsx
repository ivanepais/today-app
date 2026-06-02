import { render, screen, fireEvent } from '../../../test/utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TaskSearch } from './TaskSearch';

describe('Organism: TaskSearch', () => {
  // Clean mocks
  const mockOnChange = vi.fn();
  const mockOnSearch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('render the default text and the custom title', () => {
    const { rerender } = render(
      <TaskSearch value="" onChange={mockOnChange} />,
    );
    expect(screen.getByText('Tareas:')).toBeInTheDocument();

    rerender(<TaskSearch value="" onChange={mockOnChange} title="Projectos"/>);
    expect(screen.getByText(/Projectos/i)).toBeInTheDocument();
  });

  it('text change and return only the string', () => {
    render(<TaskSearch value="" onChange={mockOnChange} />);
    const input = screen.getByPlaceholderText(/buscar.../i);

    fireEvent.change(input, { target: { value: 'Refactor' } });

    expect(mockOnChange).toHaveBeenCalledWith('Refactor');
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  // Check search
  it('call onSearch when the user presses Enter', () => {
    render(
      <TaskSearch
        value="Mi búsqueda"
        onChange={mockOnChange}
        onSearch={mockOnSearch}
      />,
    );

    const input = screen.getByRole('textbox');

    // Enter
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    // Action pass
    expect(mockOnSearch).toHaveBeenCalledTimes(1);
  });

  it('reflect the value passed', () => {
    render(<TaskSearch value="Valor inicial" onChange={mockOnChange} />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('Valor inicial');
  });

  it('semantic structure of <section>', () => {
    const { container } = render(
      <TaskSearch value="" onChange={mockOnChange} />,
    );
    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
  });
});
