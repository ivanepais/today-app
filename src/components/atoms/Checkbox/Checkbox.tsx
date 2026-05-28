import {
  CheckboxContainer,
  HiddenCheckbox,
  StyledCheckbox,
  LabelText,
} from './Checkbox.styles';

interface CheckboxProps {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
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
        type="checkbox"
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
