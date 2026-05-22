import styled from 'styled-components';

export const FilterSectionContainer = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const CategoryList = styled.ul`
  /* Reset de estilos de lista */
  list-style: none;
  margin: 0;
  padding: 0;
  
  display: flex;
  flex-direction: column;
  
  /* Espaciado entre cada FilterItem */
  gap: ${({ theme }) => theme.spacing.sm};

  /* Optimizamos para que el scroll (si el sidebar fuera muy largo) sea suave */
  overflow-y: auto;

  /* Estilo opcional para que los li no tengan margen extra */
  li {
    margin: 0;
    padding: 0;
  }
`;