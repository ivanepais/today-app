import { useState, useId } from 'react';
import { FilterItem } from '../../molecules/FilterItem/FilterItem';
import { InputGroup } from '../../molecules/InputGroup/InputGroup';

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
  const titleId = useId(); // Genera un ID único para vincular el título con la lista

  const filteredCategories = categories.filter((cat) =>
    cat.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <aside className="filter-panel" aria-labelledby={titleId}>
      <div className="filter-panel-header">
        <h2 id={titleId}>{title}</h2>
        <InputGroup
          label="Filtrar por nombre"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar..."
        />
      </div>

      <div className="filter-panel-content">
        <ul 
          aria-label="Lista de categorías" 
          style={{ listStyle: 'none', padding: 0 }}
        >
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
        </ul>

        {filteredCategories.length === 0 && (
          <p role="status" className="filter-empty-state">
            No hay coincidencias para "{searchTerm}"
          </p>
        )}
      </div>
    </aside>
  );
};