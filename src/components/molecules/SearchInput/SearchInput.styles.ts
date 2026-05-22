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
  pointer-events: none; // Para que no interfiera al hacer click en el input
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 10px 12px 10px 36px; // Espacio extra a la izquierda para el icono
  
  /* Estilo Liquid Glass */
  background: rgba(255, 255, 255, 0.05); 
  backdrop-filter: blur(4px); // Efecto de desenfoque detrás del cristal
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  
  color: #ffffff;
  font-size: 0.9rem;
  outline: none;
  transition: all 0.2s ease-in-out;

  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }

  &:focus {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.3);
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.05);
  }
`;