import { TaskSearch } from '../TaskSearch/TaskSearch';
import { CategoryFilter } from '../CategoryFilter/CategoryFilter';
import { SidebarContainer, SectionSpacer } from './TaskSidebar.styles';
import type { Category } from '../CategoryFilter/CategoryFilter';
import type { TaskFilter } from '@/core/task.entity';

interface TaskSidebarProps {
  // TaskSearch props
  searchQuery: string;
  onSearchChange: (value: string) => void;

  // CategoryFilter props
  categories: Category[];
  activeFilterId: TaskFilter;
  onFilterChange: (id: TaskFilter) => void;
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
      <TaskSearch value={searchQuery} onChange={onSearchChange} />
      <SectionSpacer />
      <CategoryFilter
        categories={categories}
        activeFilterId={activeFilterId}
        onFilterChange={onFilterChange}
      />
    </SidebarContainer>
  );
};
