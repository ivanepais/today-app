import styled, { css } from 'styled-components';
import { mixins } from '../../../styles/mixins';

interface StyledItemProps {
  $isCompleted: boolean;
}

export const ItemContainer = styled.li<StyledItemProps>`
  ${mixins.glass}
  ${mixins.flexCenter}
  justify-content: space-between;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  gap: ${({ theme }) => theme.spacing.md};
  list-style: none;
  width: 100%;

  transition:
    transform ${({ theme }) => theme.transitions.default},
    background ${({ theme }) => theme.transitions.default},
    border-color ${({ theme }) => theme.transitions.default},
    opacity ${({ theme }) => theme.transitions.default};

  &:hover {
    background: oklch(100% 0 0deg / 10%);
    border-color: ${({ theme }) => theme.colors.primary}40;
    transform: translateX(4px); /* motion */
  }

  /* Motion */
  ${({ $isCompleted }) =>
    $isCompleted &&
    css`
      opacity: 0.7;
      background: oklch(100% 0 0deg / 2%);
    `}
`;

export const ContentWrapper = styled.label`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  flex: 1;
  min-width: 0; /* avoid content breakage */
  cursor: pointer;
  padding: 8px;
`;

interface TextProps {
  $isCompleted: boolean;
}

export const TextContainer = styled.div<TextProps>`
  flex: 1;
  transition: opacity ${({ theme }) => theme.transitions.fast};
  text-decoration: ${({ $isCompleted }) =>
    $isCompleted ? 'line-through' : 'none'};
  opacity: ${({ $isCompleted }) => ($isCompleted ? 0.5 : 1)};
  overflow-wrap: break-word;
  min-width: 0;
`;
