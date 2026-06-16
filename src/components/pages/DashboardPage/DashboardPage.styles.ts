import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
`;

export const PageContainer = styled.div`
  width: 100%;
  height: 100%;
  animation: ${fadeIn} ${({ theme }) => theme.transitions.default};
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

  /* Txt load effect */
  span {
    font-family: ${({ theme }) => theme.typography.fontFamily};
    letter-spacing: 2px;
    text-transform: uppercase;
    font-size: 0.8rem;
    animation: ${pulse} 1.5s infinite ease-in-out;
  }
`;

export const MainContentView = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  width: 100%;
  max-width: 900px;
`;
