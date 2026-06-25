import styled from 'styled-components';
import { mixins } from '../../../styles/mixins';

export const PanelContainer = styled.aside`
  ${mixins.glass};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  width: 100%;
  max-width: 320px;
  height: fit-content;
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary}30;
  }
`;

export const PanelHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};

  h2 {
    font-size: 1.25rem;
    color: ${({ theme }) => theme.colors.textPrimary};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    letter-spacing: -0.02em;
  }
`;

export const PanelContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const CategoryList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xxs};
`;

export const EmptyState = styled.p`
  padding: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  font-style: italic;
  opacity: 0.7;
`;
