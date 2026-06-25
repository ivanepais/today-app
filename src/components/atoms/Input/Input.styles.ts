import styled from 'styled-components';
import { mixins } from '../../../styles/mixins';

export const StyledInput = styled.input`
  /* Base */
  ${mixins.glass};

  width: 100%;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};

  /* Typo */
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  color: ${({ theme }) => theme.colors.textPrimary};

  /* State */
  transition: 
    background ${({ theme }) => theme.transitions.default},
    border-color ${({ theme }) => theme.transitions.default},
    box-shadow ${({ theme }) => theme.transitions.default},
    opacity ${({ theme }) => theme.transitions.default};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
    opacity: 0.7;
  }

  /* Focus */
  &:focus {
    ${mixins.electricGlow};
    background: oklch(100% 0 0deg / 12%);
    outline: none;
  }

  /* Disabled state */
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    filter: grayscale(1);
  }
`;
