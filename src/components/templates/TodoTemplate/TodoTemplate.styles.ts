import styled from 'styled-components';

export const PageWrapper = styled.main`
  min-height: 100vh;
  width: 100%;
  /* Fondo Deep Midnight con un toque de azul eléctrico en el centro */
  background: radial-gradient(
    circle at top center,
    oklch(25% 0.12 250) 0%,
    ${({ theme }) => theme.colors.background} 100%
  );
  display: flex;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};
`;

export const ContentContainer = styled.div`
  width: 100%;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`;

export const HeaderSection = styled.header`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  
  h1 {
    margin-bottom: ${({ theme }) => theme.spacing.xs};
    /* Un pequeño brillo de texto para el título */
    text-shadow: 0 0 20px ${({ theme }) => theme.colors.primary}40;
  }
`;

export const InputSection = styled.section`
  position: sticky;
  top: ${({ theme }) => theme.spacing.md};
  z-index: 10;
  /* Añadimos un pequeño difuminado detrás cuando el input se queda pegado arriba */
  &::before {
    content: '';
    position: absolute;
    inset: -10px;
    background: ${({ theme }) => theme.colors.background}80;
    backdrop-filter: blur(8px);
    z-index: -1;
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    opacity: 0;
    transition: opacity 0.3s;
  }
`;

export const ListSection = styled.section`
  flex: 1;
`;