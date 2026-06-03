import styled from 'styled-components';

export const StyledForm = styled.form`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  width: 100%;
  max-width: 800px;
  margin: 0 auto;

  /* Remaining space for input */
  & > *:first-child {
    flex: 1;
  }
`;
