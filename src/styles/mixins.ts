import { css } from 'styled-components';

export const mixins = {
  // 1. El Efecto Estrella: Glassmorphism
  glass: css`
    background: ${({ theme }) => theme.colors.glass};
    backdrop-filter: blur(${({ theme }) => theme.effects.blur});
    -webkit-backdrop-filter: blur(${({ theme }) => theme.effects.blur});
    border: 1px solid ${({ theme }) => theme.colors.glassBorder};
    box-shadow: ${({ theme }) => theme.effects.shadow};
  `,

  // 2. Centrado Perfecto con Flexbox
  flexCenter: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  // 3. Distribución Espacial para Items (Ej: Tareas del ToDo)
  flexBetween: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,

  // 4. Truncar Texto (Para nombres de tareas muy largos)
  textTruncate: css`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `,

  // 5. El "Glow" de Electric Blue (Ideal para botones o inputs activos)
  electricGlow: css`
    box-shadow: 0 0 15px 0 oklch(65% 0.22 255 / 40%);
    border-color: ${({ theme }) => theme.colors.primary};
  `,

  // 6. Scrollbar Invisible (Para contenedores que deben scrollear sin ruido visual)
  noScrollbar: css`
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;     /* Firefox */
    &::-webkit-scrollbar {
      display: none;           /* Chrome, Safari and Opera */
    }
  `,

  // 7. Animación Suave de Interactividad
  interactive: css`
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    &:active {
      transform: scale(0.98);
    }
  `
};