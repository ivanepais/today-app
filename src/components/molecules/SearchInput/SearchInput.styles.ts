import styled from 'styled-components';

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
`;

export const SearchIcon = styled.span`
  position: absolute;
  left: 8px;
  font-size: 0.9rem;
  opacity: 0.5;
  pointer-events: none; /* Do not interfere when clicking on the input */
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 10px 12px 10px 36px; /* Extra space on the left for the icon */

  /* Style */
  background: rgb(255 255 255 / 5%);
  backdrop-filter: blur(4px);
  border: 1px solid rgb(255 255 255 / 10%);
  border-radius: 12px;
  color: #fff;
  font-size: 0.9rem;
  outline: none;
  transition: all 0.2s ease-in-out;

  &::placeholder {
    color: rgb(255 255 255 / 30%);
  }

  &:focus {
    background: rgb(255 255 255 / 10%);
    border-color: rgb(255 255 255 / 30%);
    box-shadow: 0 0 15px rgb(255 255 255 / 5%);
  }
`;
