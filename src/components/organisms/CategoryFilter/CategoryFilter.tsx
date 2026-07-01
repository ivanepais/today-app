import { useId } from 'react';
import { FilterItem } from '../../molecules/FilterItem/FilterItem';
import { Typography } from '../../atoms/Typography/Typography';
import { FilterSectionContainer, CategoryList } from './CategoryFilter.styles';
import type { TaskFilter } from '@/core/task.entity';

export interface Category {
  id: TaskFilter;
  label: string;
  count: number;
}

interface CategoryFilterProps {
  categories: Category[];
  activeFilterId: TaskFilter;
  onFilterChange: (id: TaskFilter) => void;
  title?: string;
}

export const CategoryFilter = ({
  categories,
  activeFilterId,
  onFilterChange,
  title = 'Categorías',
}: CategoryFilterProps) => {
  const titleId = useId();

  return (
    <FilterSectionContainer>
      <Typography variant="label" id={titleId} as="h3">
        {title}:
      </Typography>

      <CategoryList aria-labelledby={titleId} role="list">
        {categories.map((category) => (
          <li key={category.id} role="listitem">
            <FilterItem
              label={category.label}
              count={category.count}
              isSelected={activeFilterId === category.id}
              onToggle={() => onFilterChange(category.id)}
            />
          </li>
        ))}
      </CategoryList>
    </FilterSectionContainer>
  );
};
