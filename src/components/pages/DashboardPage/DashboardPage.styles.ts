import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const PageContainer = styled.div`
  width: 100%;
  height: 100%;
  animation: ${fadeIn} 0.5s ease-out;
`;

export const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.primary};
  gap: ${({ theme }) => theme.spacing.md};

  /* Un efecto de pulso para el texto de carga */
  span {
    font-family: ${({ theme }) => theme.typography.fontFamily};
    letter-spacing: 2px;
    text-transform: uppercase;
    font-size: 0.8rem;
    animation: pulse 1.5s infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }
`;

export const MainContentView = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  width: 100%;
  max-width: 900px;
`;