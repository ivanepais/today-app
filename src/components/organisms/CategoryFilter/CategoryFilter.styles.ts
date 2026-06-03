import styled from 'styled-components';

export const FilterSectionContainer = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const CategoryList = styled.ul`
  /* Reset styles of the list */
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};

  /* smooth scroll */
  overflow-y: auto;

  /* li without extra margin */
  li {
    margin: 0;
    padding: 0;
  }
`;
