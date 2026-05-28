import styled, { css } from 'styled-components';
import { mixins } from '../../../styles/mixins';

export type TypographyVariant = 'title' | 'body' | 'label';

interface StyledProps {
  $variant: TypographyVariant;
}

const variantStyles = {
  title: css`
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    line-height: ${({ theme }) => theme.typography.lineHeight.tight};
    color: ${({ theme }) => theme.colors.textPrimary};
    letter-spacing: -0.02em;
  `,
  body: css`
    font-size: ${({ theme }) => theme.typography.fontSize.md}; /* 16px */
    font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
    color: ${({ theme }) => theme.colors.textPrimary};
    line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  `,
  label: css`
    font-size: ${({ theme }) => theme.typography.fontSize.sm}; /* 14px */
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    color: ${({ theme }) => theme.colors.textSecondary};
    text-transform: uppercase;
    letter-spacing: 0.05em;
  `,
};

export const StyledTypography = styled.p<StyledProps>`
  /* Style according to varian */
  ${({ $variant }) => variantStyles[$variant]}

  min-width: 0;
`;