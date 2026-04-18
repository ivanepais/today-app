import { Input } from '../../atoms/Input/Input';
import { SearchContainer, SearchIcon } from './SearchInput.styles';

export const SearchInput = ({ value, onChange, placeholder = "buscar..." }) => {
  return (
    <SearchContainer>
      <SearchIcon>🔍</SearchIcon>
      <Input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </SearchContainer>
  );
};