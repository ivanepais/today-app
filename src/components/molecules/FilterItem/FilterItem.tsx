import { Checkbox } from '../../atoms/Checkbox/Checkbox';
import { Badge } from '../../atoms/Badge/Badge';

interface FilterItemProps {
  label: string;
  count: number;
  isSelected: boolean;
  onToggle: () => void;
}

export const FilterItem = ({ label, count, isSelected, onToggle }: FilterItemProps) => {
  return (
    <div className="filter-item">
      <Checkbox 
        checked={isSelected} 
        onChange={onToggle} 
        label={label} 
      />
      
      {/* El Badge solo se muestra si hay elementos y la opción está seleccionada */}
      {isSelected && count > 0 && (
        <Badge count={count} overflowCount={999} />
      )}
    </div>
  );
};