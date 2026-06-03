import styled from 'styled-components';

export const PageWrapper = styled.div`
  width: 100%;
  background: radial-gradient(
    circle at top center,
    oklch(25% 0.12 250deg) 0%,
    ${({ theme }) => theme.colors.background} 100%
  );
  display: flex;
  justify-content: center;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.colors.glassBorder};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.md};
  box-shadow: 
    0 30px 60px oklch(0% 0 0deg / 30%),
    inset 0 1px 0 oklch(100% 0 0deg / 12%);
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
  margin-bottom: ${({ theme }) => theme.spacing.xs};

  h1 {
    margin-bottom: ${({ theme }) => theme.spacing.xs};
    text-shadow: 0 0 20px ${({ theme }) => theme.colors.primary}40;
  }
`;

export const InputSection = styled.section`
  top: ${({ theme }) => theme.spacing.md};
`;

export const ListSection = styled.section`
  flex: 1;
  width: 100%;
`;
