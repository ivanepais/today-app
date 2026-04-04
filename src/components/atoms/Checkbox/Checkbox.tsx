import { 
  CheckboxContainer, 
  HiddenCheckbox, 
  StyledCheckbox, 
  LabelText 
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
  disabled = false 
}: CheckboxProps) => {
  return (
    <CheckboxContainer>
      <HiddenCheckbox 
        checked={checked} 
        onChange={onChange} 
        disabled={disabled}
      />
      <StyledCheckbox $checked={checked} aria-hidden="true" />
      {label && <LabelText>{label}</LabelText>}
    </CheckboxContainer>
  );
};