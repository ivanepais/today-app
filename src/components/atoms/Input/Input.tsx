import { StyledInput } from './Input.styles';

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  disabled?: boolean; // Añadimos esto para aprovechar el estilo de disabled
  type?: 'text' | 'password' | 'email' | 'number'; // Flexibilidad extra
}

export const Input = ({ 
  value, 
  onChange, 
  placeholder, 
  onKeyDown,
  disabled = false,
  type = 'text'
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