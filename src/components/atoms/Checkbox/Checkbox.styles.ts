import styled from 'styled-components';
import { mixins } from '../../../styles/mixins';

export const CheckboxContainer = styled.label`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  cursor: pointer;
  user-select: none;
  position: relative;
`;

/* Ocultamos el input pero mantenemos su accesibilidad */
export const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
  white-space: nowrap;
`;

interface StyledCheckboxProps {
  $checked: boolean;
}

export const StyledCheckbox = styled.div<StyledCheckboxProps>`
  width: 20px;
  height: 20px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  transition: ${({ theme }) => theme.transitions.default};
  display: flex;
  align-items: center;
  justify-content: center;

  /* Estado No Seleccionado: Efecto Cristal */
  ${mixins.glass}
  background: ${({ $checked, theme }) => 
    $checked ? theme.colors.primary : 'oklch(100% 0 0 / 5%)'};
  border-color: ${({ $checked, theme }) => 
    $checked ? theme.colors.primary : theme.colors.glassBorder};

  /* El "Tick" (la palomita) */
  &::after {
    content: '';
    width: 6px;
    height: 10px;
    border: solid ${({ theme }) => theme.colors.background};
    border-width: 0 2px 2px 0;
    transform: rotate(45deg) scale(${({ $checked }) => ($checked ? 1 : 0)});
    transition: transform 0.2s cubic-bezier(0.12, 0.4, 0.29, 1.46);
    opacity: ${({ $checked }) => ($checked ? 1 : 0)};
  }

  /* Brillo al estar seleccionado o en focus */
  ${HiddenCheckbox}:focus-visible + & {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  ${CheckboxContainer}:hover & {
    border-color: ${({ theme }) => theme.colors.primary};
    ${({ $checked }) => !$checked && 'background: oklch(100% 0 0 / 10%);'}
  }
`;

export const LabelText = styled.span`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-family: ${({ theme }) => theme.typography.fontFamily};
`;