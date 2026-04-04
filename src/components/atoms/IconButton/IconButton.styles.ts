import styled from 'styled-components';
import { mixins } from '../../../styles/mixins';

export const StyledIconButton = styled.button`
  /* 1. Reset y Posicionamiento */
  ${mixins.flexCenter}
  ${mixins.interactive}
  
  /* 2. Dimensiones: Proporción 1:1 */
  width: 36px;
  height: 36px;
  padding: 0;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  
  /* 3. Estética Liquid Glass */
  background: transparent;
  color: ${({ theme }) => theme.colors.textSecondary};
  border: 1px solid transparent;
  
  transition: ${({ theme }) => theme.transitions.default};

  /* Escalado de iconos internos */
  svg, span {
    display: flex;
    font-size: 1.2rem;
    line-height: 1;
  }

  /* 4. Estados Interactivos */
  &:hover:not(:disabled) {
    color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.glass};
    border-color: ${({ theme }) => theme.colors.glassBorder};
    ${mixins.electricGlow}
    transform: scale(1.1); /* Efecto de expansión sutil */
  }

  &:active:not(:disabled) {
    transform: scale(0.95);
    filter: brightness(0.8);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;