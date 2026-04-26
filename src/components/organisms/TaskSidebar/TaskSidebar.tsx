import { TaskSearch } from '../TaskSearch/TaskSearch';
import { CategoryFilter } from '../CategoryFilter/CategoryFilter';
import { SidebarContainer, SectionSpacer } from './TaskSidebar.styles';
import type { Category } from '../CategoryFilter/CategoryFilter';

// Definimos el contrato de datos: es la suma de las necesidades de sus hijos

interface TaskSidebarProps {
  // Props para el buscador (TaskSearch)
  searchQuery: string;
  onSearchChange: (value: string) => void;

  // Props para los filtros (CategoryFilter)
  categories: Category[];
  activeFilterId: string;
  onFilterChange: (id: string) => void;
}

export const TaskSidebar = ({
  searchQuery,
  onSearchChange,
  categories,
  activeFilterId,
  onFilterChange,
}: TaskSidebarProps) => {
  return (
    <SidebarContainer>
      {/* Primer bloque independiente: Búsqueda */}
      <TaskSearch value={searchQuery} onChange={onSearchChange} />

      {/* Espaciador visual para mantener la jerarquía de Liquid Glass */}
      <SectionSpacer />

      {/* Segundo bloque independiente: Categorías */}
      <CategoryFilter
        categories={categories}
        activeFilterId={activeFilterId}
        onFilterChange={onFilterChange}
      />
    </SidebarContainer>
  );
};
