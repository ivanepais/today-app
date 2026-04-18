import { useId } from 'react';
import { FilterItem } from '../../molecules/FilterItem/FilterItem';
import { Typography } from '../../atoms/Typography/Typography';
import { FilterSectionContainer, CategoryList } from './CategoryFilter.styles';

interface Category {
  id: string;
  label: string;
  count: number;
}

interface CategoryFilterProps {
  categories: Category[];
  activeFilterId: string;
  onFilterChange: (id: string) => void;
  title?: string;
}

export const CategoryFilter = ({
  categories,
  activeFilterId,
  onFilterChange,
  title = "Categorías"
}: CategoryFilterProps) => {
  const titleId = useId();

  return (
    <FilterSectionContainer>
      <Typography 
        id={titleId} 
        variant="h3" 
        style={{ fontSize: '1rem', marginBottom: '12px' }}
      >
        {title}:
      </Typography>

      <CategoryList aria-labelledby={titleId}>
        {categories.map((category) => (
          <li key={category.id}>
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