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

  /* Hover click */
  &:hover {
    background: oklch(100% 0 0 / 5%);
  }

  background: ${({ $isSelected }) => 
    $isSelected ? 'oklch(100% 0 0 / 8%)' : 'transparent'};
`;

export const BadgeWrapper = styled.div<{ $isVisible: boolean }>`
  display: flex;
  align-items: center;
  
  /* Visible state */
  ${({ $isVisible }) => $isVisible ? css`
    animation: ${popIn} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  ` : css`
    animation: none;
  `}
  
  /* Not visible */
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  transition: opacity 0.2s ease;
  
  /* Prevent it from taking up space */
  visibility: ${({ $isVisible }) => ($isVisible ? 'visible' : 'hidden')};
`;
  
export const LabelText = styled.span`
  margin-left: ${({ theme }) => theme.spacing.sm};
  flex: 1; // Push at the final
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
`;
