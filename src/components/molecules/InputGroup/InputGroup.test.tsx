import { render, screen, fireEvent } from '../../../test/utils';
import { describe, it, expect, vi } from 'vitest';
import { InputGroup } from './InputGroup';

describe('Molecule: InputGroup', () => {
  const mockProps = {
    label: 'Nombre de la tarea',
    value: '',
    onChange: vi.fn(),
    maxLength: 20,
    placeholder: 'Escribe aquí...',
  };

  it('render the label and input', () => {
    render(<InputGroup {...mockProps} />);

    expect(screen.getByText('Nombre de la tarea')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Escribe aquí...')).toBeInTheDocument();
  });

  it('link label with input id', () => {
    render(<InputGroup {...mockProps} />);

    const label = screen.getByText('Nombre de la tarea');
    const input = screen.getByPlaceholderText('Escribe aquí...');

    // label's for loop matches the input's id
    expect(label).toHaveAttribute('for', input.id);
  });

  it('not show the character counter when value is empty', () => {
    render(<InputGroup {...mockProps} value="" />);

    // badge not present
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('show the correct remaining characters in the badge', () => {
    const value = 'Hola';
    const maxLength = 20;
    const expectedRemaining = maxLength - value.length;

    render(<InputGroup {...mockProps} value={value} maxLength={maxLength} />);

    // show 16
    expect(screen.getByText(expectedRemaining.toString())).toBeInTheDocument();
  });

  it('call onChange when the user types', () => {
    render(<InputGroup {...mockProps} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Nueva tarea' } });

    expect(mockProps.onChange).toHaveBeenCalledTimes(1);
  });

  it('disabled when the prop is passed', () => {
    render(<InputGroup {...mockProps} disabled />);

    expect(screen.getByRole('textbox')).toBeDisabled();
  });
});
