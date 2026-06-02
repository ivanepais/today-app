import { useId } from 'react';
import { Badge } from '../../atoms/Badge/Badge';
import {
  GroupContainer,
  GroupHeader,
  StyledLabel,
  StyledInput,
} from './InputGroup.styles';

interface InputGroupProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
  placeholder?: string;
  disabled?: boolean;
}

export const InputGroup = ({
  label,
  value,
  onChange,
  maxLength = 100,
  placeholder,
  disabled = false,
}: InputGroupProps) => {
  const inputId = useId();
  const remaining = maxLength - value.length;

  return (
    <GroupContainer>
      <GroupHeader>
        <StyledLabel htmlFor={inputId}>{label}</StyledLabel>

        {/* Show the counter only if the user has started typing */}
        {value.length > 0 && (
          <Badge count={remaining} overflowCount={maxLength} />
        )}
      </GroupHeader>

      <StyledInput
        id={inputId}
        type="text"
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        placeholder={placeholder}
        disabled={disabled}
      />
    </GroupContainer>
  );
};
