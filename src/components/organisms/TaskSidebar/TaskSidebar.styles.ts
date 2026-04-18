import styled from 'styled-components';

export const SidebarContainer = styled.aside`
  display: flex;
  flex-direction: column;
  
  /* Definimos un ancho sólido pero fluido para el sidebar */
  width: 300px;
  height: 100%;
  min-height: 100vh;
  
  /* Aplicamos el efecto Liquid Glass */
  background-color: ${({ theme }) => theme.colors.glass};
  backdrop-filter: blur(${({ theme }) => theme.effects.blur});
  -webkit-backdrop-filter: blur(${({ theme }) => theme.effects.blur});
  
  /* Borde sutil para separar del contenido principal */
  border-right: 1px solid ${({ theme }) => theme.colors.glassBorder};
  
  /* Sombra profunda para dar relieve */
  box-shadow: ${({ theme }) => theme.effects.shadow};
  
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