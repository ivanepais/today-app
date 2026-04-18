/*
import { useState, useId } from 'react';
import { FilterItem } from '../../molecules/FilterItem/FilterItem';
import { InputGroup } from '../../molecules/InputGroup/InputGroup';
import { 
  PanelContainer, 
  PanelHeader, 
  PanelContent, 
  CategoryList, 
  EmptyState 
} from './FilterPanel.styles';

interface Category {
  id: string;
  label: string;
  count: number;
}

interface FilterPanelProps {
  categories: Category[];
  selectedIds: string[];
  onToggleCategory: (id: string) => void;
  title?: string;
}

export const FilterPanel = ({ 
  categories, 
  selectedIds, 
  onToggleCategory, 
  title = "Filtros" 
}: FilterPanelProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const titleId = useId();

  const filteredCategories = categories.filter((cat) =>
    cat.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PanelContainer aria-labelledby={titleId}>
      <PanelHeader>
        <h2 id={titleId}>{title}</h2>
        <InputGroup
          label="Filtrar por nombre"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar categorías..."
          maxLength={30}
        />
      </PanelHeader>

      <PanelContent>
        <CategoryList aria-label="Lista de categorías">
          {filteredCategories.map((category) => (
            <li key={category.id}>
              <FilterItem
                label={category.label}
                count={category.count}
                isSelected={selectedIds.includes(category.id)}
                onToggle={() => onToggleCategory(category.id)}
              />
            </li>
          ))}
        </CategoryList>

        {filteredCategories.length === 0 && (
          <EmptyState role="status">
            No hay coincidencias para "{searchTerm}"
          </EmptyState>
        )}
      </PanelContent>
    </PanelContainer>
  );
};
*/

import { useState, useId } from 'react';
import { FilterItem } from '../../molecules/FilterItem/FilterItem';
import { InputGroup } from '../../molecules/InputGroup/InputGroup';
import { 
  PanelContainer, 
  PanelHeader, 
  PanelContent, 
  CategoryList, 
  EmptyState 
} from './FilterPanel.styles';

interface Category {
  id: string;
  label: string;
  count: number;
}

interface FilterPanelProps {
  categories: Category[];
  selectedIds: string[];
  onToggleCategory: (id: string) => void;
  title?: string;
}

export const FilterPanel = ({ 
  categories, 
  selectedIds, 
  onToggleCategory, 
  title = "Filtros" 
}: FilterPanelProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const titleId = useId();

  const filteredCategories = categories.filter((cat) =>
    cat.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PanelContainer aria-labelledby={titleId}>
      <PanelHeader>
        <h2 id={titleId}>{title}</h2>
        <InputGroup
          label="Filtrar por nombre"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar categorías..."
          maxLength={30}
        />
      </PanelHeader>

      <PanelContent>
        <CategoryList aria-label="Lista de categorías">
          {filteredCategories.map((category) => (
            <li key={category.id}>
              <FilterItem
                label={category.label}
                count={category.count}
                isSelected={selectedIds.includes(category.id)}
                onToggle={() => onToggleCategory(category.id)}
              />
            </li>
          ))}
        </CategoryList>

        {filteredCategories.length === 0 && (
          <EmptyState role="status">
            No hay coincidencias para "{searchTerm}"
          </EmptyState>
        )}
      </PanelContent>
    </PanelContainer>
  );
};

