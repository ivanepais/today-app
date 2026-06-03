import styled from 'styled-components';

export const StyledBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  /* Base */
  min-width: 20px;
  height: 20px;
  padding: 0 6px;

  /* Design */
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};

  /* Typo */
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: 10px; /* pequeño */
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  line-height: 1;
  white-space: nowrap;

  /* Effect */
  box-shadow: 0 0 10px ${({ theme }) => theme.colors.primary}40;
  border: 1px solid oklch(100% 0 0deg / 20%);
`;
