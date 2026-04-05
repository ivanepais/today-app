import { Checkbox } from '../../atoms/Checkbox/Checkbox';
import { Badge } from '../../atoms/Badge/Badge';
import { FilterContainer, BadgeWrapper } from './FilterItem.styles';

interface FilterItemProps {
  label: string;
  count: number;
  isSelected: boolean;
  onToggle: () => void;
}

export const FilterItem = ({ 
  label, 
  count, 
  isSelected, 
  onToggle 
}: FilterItemProps) => {
  return (
    <FilterContainer onClick={onToggle}>
      <Checkbox 
        checked={isSelected} 
        onChange={onToggle} 
        label={label} 
      />
      
      {/* El Badge solo se muestra si está seleccionado y hay items */}
      {isSelected && count > 0 && (
        <BadgeWrapper>
          <Badge count={count} overflowCount={999} />
        </BadgeWrapper>
      )}
    </FilterContainer>
  );
};