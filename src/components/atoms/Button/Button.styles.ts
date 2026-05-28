import styled, { css } from 'styled-components';
import { mixins } from '../../../styles/mixins';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface StyledButtonProps {
  $variant: ButtonVariant;
  $size: ButtonSize;
  $fullWidth?: boolean;
}

const variantStyles = {
  primary: css`
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.background};
    border: 1px solid ${({ theme }) => theme.colors.primary};
    
    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.primaryHover};
      ${mixins.electricGlow}
    }
  `,
  secondary: css`
    ${mixins.glass}
    color: ${({ theme }) => theme.colors.textPrimary};
    
    &:hover:not(:disabled) {
      background-color: oklch(100% 0 0 / 15%);
      border-color: ${({ theme }) => theme.colors.primary};
    }
  `,
  ghost: css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.textSecondary};
    border: 1px solid transparent;

    &:hover:not(:disabled) {
      color: ${({ theme }) => theme.colors.textPrimary};
      background-color: oklch(100% 0 0 / 5%);
    }
  `,
};

const sizeStyles = {
  sm: css`
    padding: 0.4rem 0.8rem;
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
  `,
  md: css`
    padding: 0.6rem 1.2rem;
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
  `,
  lg: css`
    padding: 0.8rem 1.6rem;
    font-size: ${({ theme }) => theme.typography.fontSize.md};
  `,
};

export const StyledButton = styled.button<StyledButtonProps>`
  /* Base */
  ${mixins.flexCenter}
  ${mixins.interactive}
  
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  gap: ${({ theme }) => theme.spacing.sm};

  /* Variant and size */
  ${({ $variant }) => variantStyles[$variant]}
  ${({ $size }) => sizeStyles[$size]}

  /* State */
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    filter: grayscale(0.8);
  }
`;