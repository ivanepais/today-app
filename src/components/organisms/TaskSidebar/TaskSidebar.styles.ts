import styled from 'styled-components';
import { mixins } from '../../../styles/mixins';

export const SidebarContainer = styled.aside`
  display: flex;
  flex-direction: column;
  width: 100%; 
  height: fit-content;
  min-height: auto;

  @media (width >= 800px) {
    width: 280px;
  }
  background-color: ${({ theme }) => theme.colors.glass};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.glassBorder};
  padding: ${({ theme }) => theme.spacing.lg} 0;
`;

export const SectionSpacer = styled.div`
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
