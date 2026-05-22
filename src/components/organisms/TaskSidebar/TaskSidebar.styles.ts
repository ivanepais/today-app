import styled from 'styled-components';

export const SidebarContainer = styled.aside`
  display: flex;
  flex-direction: column;
  
  /* Ancho responsivo */
  width: 100%; 
  height: fit-content;
  min-height: auto;

  box-shadow: 
    0 30px 60px oklch(0% 0 0 / 30%),
    inset 0 1px 0px oklch(100% 0 0 / 12%); /* Reflejo superior estilo cristal */
  }

  @media (min-width: 800px) {
    width: 280px;
  }

  /* Aplicamos el efecto Liquid Glass */
  background-color: ${({ theme }) => theme.colors.glass};
  backdrop-filter: blur(${({ theme }) => theme.effects.blur});
  -webkit-backdrop-filter: blur(${({ theme }) => theme.effects.blur});
  
  /* Borde sutil para separar del contenido principal */
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.colors.glassBorder};
    
  /* Espaciado interno general */
  padding: ${({ theme }) => theme.spacing.lg} 0;
  
  /* Animación de entrada o cambio de estado */
  transition: ${({ theme }) => theme.transitions.default};
`;

export const SectionSpacer = styled.div`
  /* Una línea divisoria que no rompe el cristal, solo lo marca */
  height: 1px;
  width: calc(100% - ${({ theme }) => theme.spacing.xl});
  margin: ${({ theme }) => theme.spacing.md} auto;
  
  background: linear-gradient(
    90deg, 
    transparent, 
    ${({ theme }) => theme.colors.glassBorder}, 
    transparent
  );
`;