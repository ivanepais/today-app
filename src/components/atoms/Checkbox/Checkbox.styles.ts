import styled from 'styled-components';
import { mixins } from '../../../styles/mixins';

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  cursor: pointer;
  user-select: none;
  position: relative;
`;

/* hide input, maintain its accessibility */
export const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip-path: inset(50%);
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
  display: flex;
  align-items: center;
  justify-content: center;

  /* Unselected State */
  ${mixins.glass}
  background: ${({ $checked, theme }) =>
    $checked ? theme.colors.primary : 'oklch(100% 0 0 / 5%)'};
  border-color: ${({ $checked, theme }) =>
    $checked ? theme.colors.primary : theme.colors.glassBorder};

  transition: 
    background ${({ theme }) => theme.transitions.default},
    border-color ${({ theme }) => theme.transitions.default};

  /* "Tick" */
  &::after {
    content: '';
    width: 6px;
    height: 10px;
    border: solid ${({ theme }) => theme.colors.background};
    border-width: 0 2px 2px 0;
    transform: rotate(45deg) scale(${({ $checked }) => ($checked ? 1 : 0)});
    opacity: ${({ $checked }) => ($checked ? 1 : 0)};
    transition: 
      transform 0.2s cubic-bezier(0.12, 0.4, 0.29, 1.46),
      opacity 0.2s ease-in-out;
  }
  
  /* Brightness when selected or in focus */
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
  cursor: pointer; /* Label */
  user-select: none; /* Prevents text from being highlighted on click */

  &:empty {
    display: none;
  }
`;
