/*

import {
  CheckboxContainer,
  HiddenCheckbox,
  StyledCheckbox,
  LabelText,
} from './Checkbox.styles';

interface CheckboxProps {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  disabled?: boolean;
}

export const Checkbox = ({
  checked,
  onChange,
  label,
  disabled = false,
}: CheckboxProps) => {
  return (
    <CheckboxContainer>
      <HiddenCheckbox
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <StyledCheckbox
        $checked={checked}
        aria-hidden="true"
        data-testid="checkbox-visual"
      />
      {label && <LabelText>{label}</LabelText>}
    </CheckboxContainer>
  );
};

*/

import {
  CheckboxContainer,
  HiddenCheckbox,
  StyledCheckbox,
  LabelText,
} from './Checkbox.styles';

interface CheckboxProps {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void; // 👈 Contrato limpio: boolean
  label?: string;
  disabled?: boolean;
}

export const Checkbox = ({
  id,
  checked,
  onChange,
  label,
  disabled = false,
}: CheckboxProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;

    onChange(e.target.checked);
  };

  return (
    <CheckboxContainer>
      <HiddenCheckbox
        id={id}
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        type="checkbox" // Garantizamos el tipo
      />
      <StyledCheckbox
        $checked={checked}
        aria-hidden="true"
        data-testid="checkbox-visual"
      />
      {label && (
        <LabelText as="label" htmlFor={id}>
          {label}
        </LabelText>
      )}
    </CheckboxContainer>
  );
};
