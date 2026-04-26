/*
import { StyledInput } from './Input.styles';

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  disabled?: boolean; // estilo de disabled
  type?: 'text' | 'password' | 'email' | 'number'; // Flexibilidad extra
}

export const Input = ({
  value,
  onChange,
  placeholder,
  onKeyDown,
  disabled = false,
  type = 'text',
}: InputProps) => {
  return (
    <StyledInput
      type={type}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      disabled={disabled}
      aria-label={placeholder}
    />
  );
};
*/

import { StyledInput } from './Input.styles';

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onEnter?: () => void;
  disabled?: boolean;
  type?: 'text' | 'password' | 'email' | 'number';
}

export const Input = ({
  value,
  onChange,
  placeholder,
  onEnter,
  disabled = false,
  type = 'text',
}: InputProps) => {
  // Manejador interno para extraer el valor
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  // Manejador interno para la tecla Enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onEnter) {
      onEnter();
    }
  };

  return (
    <StyledInput
      type={type}
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      disabled={disabled}
      aria-label={placeholder}
    />
  );
};
