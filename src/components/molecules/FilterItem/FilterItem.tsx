import { useId } from 'react';
import { Checkbox } from '../../atoms/Checkbox/Checkbox';
import { Badge } from '../../atoms/Badge/Badge';
import { FilterContainer, BadgeWrapper, LabelText } from './FilterItem.styles';

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
  onToggle,
}: FilterItemProps) => {
  // Item id
  const inputId = useId();

  return (
    /* Container label, linked to id; click in anywhere */
    <FilterContainer as="label" htmlFor={inputId} $isSelected={isSelected}>
      <Checkbox
        id={inputId}
        checked={isSelected}
        onChange={onToggle}
      />

      <LabelText>{label}</LabelText>

      {count > 0 && (
        <BadgeWrapper $isVisible={isSelected}>
          <Badge count={count} overflowCount={999} />
        </BadgeWrapper>
      )}
    </FilterContainer>
  );
};
