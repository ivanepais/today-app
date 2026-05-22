/*
import { Input } from '../../atoms/Input/Input';
import { SearchContainer, SearchIcon } from './SearchInput.styles';

export const SearchInput = ({ value, onChange, placeholder = 'buscar...' }) => {
  return (
    <SearchContainer>
      <SearchIcon>🔍</SearchIcon>
      <Input value={value} onChange={onChange} placeholder={placeholder} />
    </SearchContainer>
  );
};
*/

import { Input } from '../../atoms/Input/Input';
import { SearchContainer, SearchIcon } from './SearchInput.styles';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSearch?: () => void;
  placeholder?: string;
  className?: string;
}

export const SearchInput = ({
  value,
  onChange,
  onSearch,
  placeholder = 'Buscar tareas...',
}: SearchInputProps) => {
  return (
    <SearchContainer>
      <SearchIcon role="img" aria-label="Icono de búsqueda">
        🔍
      </SearchIcon>

      <Input
        value={value}
        onChange={onChange}
        onEnter={onSearch}
        placeholder={placeholder}
        type="text"
      />
    </SearchContainer>
  );
};
