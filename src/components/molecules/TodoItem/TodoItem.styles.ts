import styled, { css } from 'styled-components';
import { mixins } from '../../../styles/mixins';

interface StyledItemProps {
  $isCompleted: boolean;
}

export const ItemContainer = styled.li<StyledItemProps>`
  ${mixins.glass}
  ${mixins.flexCenter}
  justify-content:空间-between;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  gap: ${({ theme }) => theme.spacing.md};
  transition: ${({ theme }) => theme.transitions.default};
  list-style: none;
  width: 100%;

  /* Efecto Hover: se ilumina sutilmente al pasar el mouse */
  &:hover {
    background: oklch(100% 0 0 / 10%);
    border-color: ${({ theme }) => theme.colors.primary}40;
    transform: translateX(4px); /* Pequeño desplazamiento orgánico */
  }

  /* Si está completada, suavizamos su presencia */
  ${({ $isCompleted }) =>
    $isCompleted &&
    css`
      opacity: 0.7;
      background: oklch(100% 0 0 / 2%);
    `}
`;

export const ContentWrapper = styled.label`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  flex: 1;
  min-width: 0; /* Evita que el texto rompa el layout */
  cursor: pointer;
  padding: 8px;
`;

interface TextProps {
  $isCompleted: boolean;
}

export const TextContainer = styled.div<TextProps>`
  flex: 1;
  transition: all 0.3s ease;
  text-decoration: ${({ $isCompleted }) => ($isCompleted ? 'line-through' : 'none')};
  opacity: ${({ $isCompleted }) => ($isCompleted ? 0.5 : 1)};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;