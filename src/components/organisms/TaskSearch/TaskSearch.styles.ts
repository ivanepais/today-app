import styled from 'styled-components';

export const SearchSectionContainer = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  gap: ${({ theme }) => theme.spacing.sm};

  & > * {
    max-width: 100%;
  }
`;
