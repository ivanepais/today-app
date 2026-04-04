import styled from 'styled-components';

export const StyledBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  
  /* Dimensiones base */
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  
  /* Diseño: Círculo/Píldora */
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  
  /* Tipografía */
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: 10px; /* Tamaño muy pequeño para badges */
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  line-height: 1;
  white-space: nowrap;

  /* Efecto de Brillo (Liquid Glow) */
  box-shadow: 0 0 10px ${({ theme }) => theme.colors.primary}40;
  border: 1px solid oklch(100% 0 0 / 20%);
`;