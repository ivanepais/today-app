import styled from 'styled-components';

export const FilterContainer = styled.div<{ $isSelected: boolean }>`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  gap: ${({ theme }) => theme.spacing.md};
  cursor: pointer;
  transition: background ${({ theme }) => theme.transitions.default};

  /* Hover & Selected state */
  background: ${({ $isSelected }) =>
    $isSelected ? 'oklch(100% 0 0 / 8%)' : 'transparent'};

  &:hover {
    background: ${({ $isSelected }) =>
      $isSelected ? 'oklch(100% 0 0 / 12%)' : 'oklch(100% 0 0 / 5%)'};
  }
`;

export const BadgeWrapper = styled.div<{ $isVisible: boolean }>`
  display: flex;
  align-items: center;
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  transform: scale(${({ $isVisible }) => ($isVisible ? 1 : 0)});
  visibility: ${({ $isVisible }) => ($isVisible ? 'visible' : 'hidden')};
  transition: transform ${({ $isVisible }) =>
    $isVisible
      ? '0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      : '0.12s cubic-bezier(0.4, 0, 1, 1)'},
              opacity 0.12s ease-in-out,
              visibility 0.12s;
  max-width: ${({ $isVisible }) => ($isVisible ? '50px' : '0px')};
  pointer-events: ${({ $isVisible }) => ($isVisible ? 'auto' : 'none')};

`;

export const LabelText = styled.span`
  margin-left: ${({ theme }) => theme.spacing.sm};
  flex: 1; /* Push at the final */
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
`;
