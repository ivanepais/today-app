import styled from 'styled-components';

export const StyledForm = styled.form`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  width: 100%;
  max-width: 800px; /* O el ancho que prefieras para tu layout */
  margin: 0 auto;
  
  /* Aseguramos que el input crezca para ocupar el espacio restante */
  & > *:first-child {
    flex: 1;
  }
`;