import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  /* 1. Reset e Higiene CSS */
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 100%;
    scroll-behavior: smooth;
  }

  body {
    /* Usamos los nuevos tokens de tipografía */
    font-family: ${({ theme }) => theme.typography.fontFamily};
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.textPrimary};
    
    /* Gradientes orgánicos basados en el tono Deep Midnight (258-280) */
    background-image: 
      radial-gradient(at 0% 0%, oklch(25% 0.08 260 / 30%) 0px, transparent 50%),
      radial-gradient(at 100% 100%, oklch(20% 0.12 280 / 20%) 0px, transparent 50%);
    
    min-height: 100vh;
    line-height: ${({ theme }) => theme.typography.lineHeight.normal};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    
    display: flex;
    justify-content: center;
    padding: ${({ theme }) => theme.spacing.xl};
    overflow-x: hidden;
  }

  /* 2. Títulos Coherentes */
  h1, h2, h3, h4 {
    color: ${({ theme }) => theme.colors.textPrimary};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    line-height: ${({ theme }) => theme.typography.lineHeight.tight};
  }

  /* 3. Inputs y Botones Globales */
  input, button, textarea {
    font-family: inherit;
    font-size: inherit;
    color: inherit;
    background: transparent;
    border: none;
    outline: none;
  }

  button {
    cursor: pointer;
    /* Usamos la transición centralizada */
    transition: ${({ theme }) => theme.transitions.default};
    
    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }

  /* 4. Estados de Foco (Accesibilidad) */
  :focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 4px;
  }

  /* 5. Scrollbar con estilo Glassmorphism */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.glassBorder};
    border-radius: ${({ theme }) => theme.borderRadius.full};
    border: 2px solid ${({ theme }) => theme.colors.background};
    
    &:hover {
      background: ${({ theme }) => theme.colors.textSecondary};
    }
  }

  /* Selección de texto con el color primario */
  ::selection {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.background};
  }
`;