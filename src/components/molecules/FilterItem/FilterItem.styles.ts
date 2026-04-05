import styled from 'styled-components';

export const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: ${({ theme }) => theme.transitions.default};
  gap: ${({ theme }) => theme.spacing.md};
  cursor: pointer;

  /* Un efecto de fondo muy sutil al pasar el mouse para indicar que es clicable */
  &:hover {
    background: oklch(100% 0 0 / 5%);
  }
`;

export const BadgeWrapper = styled.div`
  display: flex;
  align-items: center;
  /* Animación de entrada para que el badge aparezca suavemente */
  animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  @keyframes popIn {
    from { transform: scale(0); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }
`;