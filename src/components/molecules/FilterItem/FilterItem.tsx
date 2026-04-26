/*
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
  onToggle,
}: FilterItemProps) => {
  return (
    <FilterContainer onClick={onToggle}>
      <Checkbox checked={isSelected} onChange={onToggle} label={label} />

      {isSelected && count > 0 && (
        <BadgeWrapper>
          <Badge count={count} overflowCount={999} />
        </BadgeWrapper>
      )}
    </FilterContainer>
  );
};

*/

/*
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
  onToggle,
}: FilterItemProps) => {

  const handleToggle = (e?: React.MouseEvent) => {
    // contenedor como área de click, 
    // evita que otros elementos disparen eventos extra.
    if (e) e.preventDefault(); 
    onToggle();
  };

  return (
    // Contenedor como área de interacción
    <FilterContainer onClick={handleToggle} $isSelected={isSelected}>
      <Checkbox 
        checked={isSelected} 
        // Pasamos una función que ignora el booleano para cumplir el contrato
        onChange={() => onToggle()} 
        label={label} 
      />

      {isSelected && count > 0 && (
        <BadgeWrapper>
          <Badge count={count} overflowCount={999} />
        </BadgeWrapper>
      )}
    </FilterContainer>
  );
};
*/

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
  // Generamos un ID único y estable para este item
  const inputId = useId();

  return (
    /** * 1. El contenedor ahora es un LABEL.
     * Al estar vinculado al ID del checkbox, el click en cualquier
     * parte (incluyendo el espacio vacío) activa el input.
     */
    <FilterContainer as="label" htmlFor={inputId} $isSelected={isSelected}>
      <Checkbox
        id={inputId}
        checked={isSelected}
        onChange={onToggle} // Encaja perfecto: (val) => onToggle()
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
