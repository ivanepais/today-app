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
  // extract the value
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  // Enter key
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
