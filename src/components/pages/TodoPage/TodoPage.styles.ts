import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const StyledPage = styled.div`
  width: 100%;
  height: 100%;
  animation: ${fadeIn} ${({ theme }) => theme.transitions.default};
`;
