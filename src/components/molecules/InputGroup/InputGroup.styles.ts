import styled from 'styled-components';

export const GroupContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  width: 100%;
`;

export const GroupHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0 ${({ theme }) => theme.spacing.xs};
`;

export const StyledLabel = styled.label`
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: 14px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.glass};
  border: 1px solid ${({ theme }) => theme.colors.glassBorder};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: 1rem;
  backdrop-filter: blur(12px);
  transition: ${({ theme }) => theme.transitions.default};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary}80;
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 15px ${({ theme }) => theme.colors.primary}30;
    background: oklch(100% 0 0 / 8%);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;