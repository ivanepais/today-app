import React from 'react';
import { 
  TemplateWrapper, 
  StyledHeader, 
  StyledSidebar, 
  StyledMain, 
  StyledFooter 
} from './DashboardTemplate.styles';

interface DashboardTemplateProps {
  header: React.ReactNode;
  sidebar: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export const DashboardTemplate = ({ 
  header, 
  sidebar, 
  children, 
  footer 
}: DashboardTemplateProps) => {
  return (
    <TemplateWrapper>
      <StyledHeader>
        {header}
      </StyledHeader>

      <StyledSidebar>
        {sidebar}
      </StyledSidebar>

      <StyledMain>
        {children}
      </StyledMain>

      {footer && (
        <StyledFooter>
          {footer}
        </StyledFooter>
      )}
    </TemplateWrapper>
  );
};