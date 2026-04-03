import styled from 'styled-components';
import { mixins } from '../../../styles/mixins';

export const StyledInput = styled.input`
  /* 1. Base del diseño: Efecto Cristal */
  ${mixins.glass}
  
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  
  /* 2. Tipografía */
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  color: ${({ theme }) => theme.colors.textPrimary};
  
  /* 3. Animación y Estados */
  transition: ${({ theme }) => theme.transitions.default};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
    opacity: 0.7;
  }

  /* 4. Foco: Aplicamos el brillo "Electric Blue" */
  &:focus {
    ${mixins.electricGlow}
    background: oklch(100% 0 0 / 12%); /* Aclaramos un poco el cristal al escribir */
    outline: none;
  }

  /* 5. Estado Deshabilitado */
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    filter: grayscale(1);
  }
`;