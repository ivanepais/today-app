import { css } from 'styled-components';

export const mixins = {
  /* Glass effect */
  glass: css`
    background: ${({ theme }) => theme.colors.glass};
    border: 1px solid ${({ theme }) => theme.colors.glassBorder};
    box-shadow: ${({ theme }) => theme.effects.shadow};
  `,

  boxElevated: css`
    box-shadow: ${({ theme }) => theme.shadows.glassElevated};
  `,

  /* Flexbox center */
  flexCenter: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  /* Distribution */
  flexBetween: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,

  /* Trunk Txt */
  textTruncate: css`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `,

  /* Input, Button effect */
  electricGlow: css`
    box-shadow: 0 0 15px 0 oklch(65% 0.22 255deg / 40%);
    border-color: ${({ theme }) => theme.colors.primary};
  `,

  /* Invisible Scrollbar*/
  noScrollbar: css`
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    &::-webkit-scrollbar {
      display: none; /* Chrome, Safari and Opera */
    }
  `,

  /* Animation */
  interactive: css`
    transition: transform ${({ theme }) => theme.transitions.default};

    &:active {
      transform: scale(0.98);
    }
  `,
};
