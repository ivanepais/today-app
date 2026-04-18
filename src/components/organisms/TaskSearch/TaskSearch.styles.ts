import styled from 'styled-components';

export const SearchSectionContainer = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  
  /* Usamos el espaciado md (1rem) para dar aire interno */
  padding: ${({ theme }) => theme.spacing.md};
  
  /* Efecto Liquid: 
     Podemos añadir una transición suave por si el contenedor 
     cambia de estado o tamaño 
  */
  transition: ${({ theme }) => theme.transitions.default};

  /* Aseguramos que los componentes internos (como Typography) 
     no estiren el contenedor de forma extraña 
  */
  & > * {
    max-width: 100%;
  }

  /* Opcional: Un sutil separador inferior si sientes que las secciones 
     se pegan demasiado, aunque el SectionSpacer del Sidebar ya hace ese trabajo.
  */
`;