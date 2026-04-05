import styled from 'styled-components';

export const TemplateWrapper = styled.div`
  display: grid;
  grid-template-areas: 
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 300px 1fr;
  min-height: 100vh;
  width: 100%;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.textPrimary};

  /* Responsividad: En móviles, el sidebar pasa arriba o se oculta */
  @media (max-width: 1024px) {
    grid-template-areas: 
      "header"
      "sidebar"
      "main"
      "footer";
    grid-template-columns: 1fr;
  }
`;

export const StyledHeader = styled.header`
  grid-area: header;
  position: sticky;
  top: 0;
  z-index: 100;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.glass};
  backdrop-filter: blur(12px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.glassBorder};
`;

export const StyledSidebar = styled.aside`
  grid-area: sidebar;
  padding: ${({ theme }) => theme.spacing.xl};
  background: oklch(0% 0 0 / 10%); /* Un tono más oscuro para el lateral */
  border-right: 1px solid ${({ theme }) => theme.colors.glassBorder};
  overflow-y: auto;
  height: calc(100vh - 80px); /* Ajuste según altura del header */
  position: sticky;
  top: 80px;
`;

export const StyledMain = styled.main`
  grid-area: main;
  padding: ${({ theme }) => theme.spacing.xl};
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
`;

export const StyledFooter = styled.footer`
  grid-area: footer;
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.glass};
  border-top: 1px solid ${({ theme }) => theme.colors.glassBorder};
  text-align: center;
`;