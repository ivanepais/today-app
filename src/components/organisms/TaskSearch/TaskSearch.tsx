import { SearchInput } from '../../molecules/SearchInput/SearchInput';
import { Typography } from '../../atoms/Typography/Typography';
import { SearchSectionContainer } from './TaskSearch.styles';

interface TaskSearchProps {
  value: string;
  onChange: (value: string) => void;
  title?: string;
  subtitle?: string;
}

export const TaskSearch = ({ 
  value, 
  onChange, 
  title = "Tareas", 
  subtitle = "filtrar por tareas" 
}: TaskSearchProps) => {
  return (
    <SearchSectionContainer>
      <Typography variant="h2" style={{ fontSize: '1.2rem', marginBottom: '4px' }}>
        {title}
      </Typography>
      <Typography variant="caption" color="textSecondary" style={{ display: 'block', marginBottom: '12px' }}>
        {subtitle}
      </Typography>
      
      <SearchInput 
        value={value} 
        onChange={(e: any) => {
          const val = typeof e === 'string' ? e : e.target.value;
          onChange(val);
        }} 
        placeholder="Buscar tareas..."
      />
    </SearchSectionContainer>
  );
};