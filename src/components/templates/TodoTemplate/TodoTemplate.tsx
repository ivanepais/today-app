import React from 'react';
import { 
  PageWrapper, 
  ContentContainer, 
  HeaderSection, 
  InputSection, 
  ListSection 
} from './TodoTemplate.styles';

interface TodoTemplateProps {
  header: React.ReactNode;
  inputSlot: React.ReactNode;
  listSlot: React.ReactNode;
}

export const TodoTemplate = ({ 
  header, 
  inputSlot, 
  listSlot 
}: TodoTemplateProps) => {
  return (
    <PageWrapper>
      <ContentContainer>
        
        <HeaderSection>
          {header}
        </HeaderSection>

        <InputSection>
          {inputSlot}
        </InputSection>

        <ListSection>
          {listSlot}
        </ListSection>

      </ContentContainer>
    </PageWrapper>
  );
};