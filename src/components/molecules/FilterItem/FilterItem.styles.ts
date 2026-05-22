import styled, { keyframes, css } from 'styled-components';

const popIn = keyframes`
  from { 
    transform: scale(0); 
    opacity: 0; 
  }
  to { 
    transform: scale(1); 
    opacity: 1; 
  }
`;

export const FilterContainer = styled.div<{ $isSelected: boolean }>`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: ${({ theme }) => theme.transitions.default};
  gap: ${({ theme }) => theme.spacing.md};
  cursor: pointer;

  /* Un efecto de fondo muy sutil al pasar el mouse para indicar que es clicable */
  &:hover {
    background: oklch(100% 0 0 / 5%);
  }

  background: ${({ $isSelected }) => 
    $isSelected ? 'oklch(100% 0 0 / 8%)' : 'transparent'};
`;

export const BadgeWrapper = styled.div<{ $isVisible: boolean }>`
  display: flex;
  align-items: center;
  
  /* 2. Aplicamos la animación solo cuando es visible */
  ${({ $isVisible }) => $isVisible ? css`
    animation: ${popIn} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  ` : css`
    animation: none;
  `}
  
  /* 3. El estado final/transición para cuando deja de ser visible */
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  transition: opacity 0.2s ease;
  
  /* Evitamos que el badge ocupe espacio si no es visible */
  visibility: ${({ $isVisible }) => ($isVisible ? 'visible' : 'hidden')};
`;
  
export const LabelText = styled.span`
  margin-left: ${({ theme }) => theme.spacing.sm};
  flex: 1; // Empuja el Badge al final
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
`;
