import { SearchInput } from '../../molecules/SearchInput/SearchInput';
import { Typography } from '../../atoms/Typography/Typography';
import { SearchSectionContainer } from './TaskSearch.styles';

interface TaskSearchProps {
  value: string;
  onChange: (value: string) => void;
  onSearch?: () => void;
  title?: string;
  subtitle?: string;
}

export const TaskSearch = ({
  value,
  onChange,
  onSearch,
  title = 'Tareas',
}: TaskSearchProps) => {
  return (
    <SearchSectionContainer>
      <Typography variant="label">{title}:</Typography>

      <SearchInput
        value={value}
        onChange={onChange}
        onSearch={onSearch}
        placeholder="  Buscar..."
      />
    </SearchSectionContainer>
  );
};
