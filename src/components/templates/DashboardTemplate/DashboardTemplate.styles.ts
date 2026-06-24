import styled from 'styled-components';
import { mixins } from '../../../styles/mixins';

export const TemplateWrapper = styled.div`
  display: grid;
  grid-template-areas:
    'header'
    'main'
    'sidebar'
    'footer';
  grid-template-columns: minmax(0, 1fr);
  min-height: 100vh;
  width: 100%;
  color: ${({ theme }) => theme.colors.textPrimary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.glassBorder};

  @media (width >= 800px) {
    grid-template:
      'header header' auto
      'sidebar main' 1fr
      'footer footer' auto / auto minmax(0, 1fr);
  }
`;

export const StyledHeader = styled.header`
  grid-area: header;
  top: 0;
  z-index: 100;
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.glass};
  border-radius: 16px 16px 0 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.glassBorder};
  
  @media (width >= 800px) {
    padding: ${({ theme }) => theme.spacing.md}
      ${({ theme }) => theme.spacing.xl};
  }
`;

export const StyledSidebar = styled.aside`
  grid-area: sidebar;
  padding: ${({ theme }) => theme.spacing.md};
  position: relative;
  border-top: 1px solid ${({ theme }) => theme.colors.glassBorder};
  place-self: start center;
  width: 100%;

  @media (width >= 800px) {
    border-top: none;
    border-right: 1px solid ${({ theme }) => theme.colors.glassBorder};
    place-self: stretch stretch;
    padding: ${({ theme }) => theme.spacing.xl};
    width: auto;
  }
`;

export const StyledMain = styled.main`
  grid-area: main;
  padding: ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  @media (width >= 800px) {
    padding: ${({ theme }) => theme.spacing.xl};

    & > * {
      width: 100%;
      max-width: 800px;
    }
  }
`;

export const StyledFooter = styled.footer`
  grid-area: footer;
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.glass};
  border-top: 1px solid ${({ theme }) => theme.colors.glassBorder};
  text-align: center;
`;
