import { useMemo } from 'react';
import { useTasks } from '../../../hooks/useTasks';
import { DashboardTemplate } from '../../templates/DashboardTemplate/DashboardTemplate';
import { TodoTemplate } from '../../templates/TodoTemplate/TodoTemplate';
import { TaskSidebar } from '../../organisms/TaskSidebar/TaskSidebar';
import { TodoList } from '../../organisms/TodoList/TodoList';
import { TodoInput } from '../../molecules/TodoInput/TodoInput';
import { Typography } from '../../atoms/Typography/Typography';
import { Button } from '../../atoms/Button/Button';

import type { Category } from '../../organisms/CategoryFilter/CategoryFilter';

export const TodoPage = () => {
  // Extraemos todo del hook, con las funciones
  const {
    tasks,
    add,
    toggle,
    remove,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    stats,
    clearCompleted,
  } = useTasks();

  // Mapeamos las categorías para el CategoryFilter
  const categories = useMemo<Category[]>(
    () => [
      { id: 'all', label: 'Todas', count: stats.total },
      { id: 'pending', label: 'Pendientes', count: stats.pending },
      { id: 'completed', label: 'Completadas', count: stats.completed },
    ],
    [stats],
  );

  const isSearching = searchQuery.trim().length > 0;

  const emptyStateProps = useMemo(() => {
    // Prioridad Absoluta: Si el usuario escribe en el buscador
    if (isSearching) {
      return {
        icon: '🔍',
        title: 'No hay coincidencias',
        description: 'Prueba con otros términos o limpia el buscador.',
      };
    }

    // Diccionario de configuración basado en las reglas de negocio del Core
    const configs = {
      all: {
        icon: '📝',
        title: 'No hay tareas',
        description: '¡Añade algo para empezar el día!',
      },
      pending: {
        icon: '⚡',
        title: 'No hay tareas pendientes',
        description: '¡Estás completamente al día!',
      },
      completed: {
        icon: '✅',
        title: 'No hay tareas completadas',
        description: 'Aún no has terminado ninguna tarea.',
      },
    };

    return configs[filter];
  }, [filter, isSearching]); // Solo se vuelve a calcular si cambia el filtro o el estado de búsqueda


  return (
    <DashboardTemplate
      header={<Typography variant="appTitle">Today app</Typography>}
      sidebar={
        <div>
          <TaskSidebar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            categories={categories}
            activeFilterId={filter}
            onFilterChange={(id) => setFilter(id)}
          />
          {stats.completed > 0 && (
            <div style={{ padding: '0 1rem 1rem 1rem', marginTop: '1.5rem' }}>
              <Button
                variant="secondary"
                onClick={clearCompleted}
                style={{ width: '100%' }}
              >
                Borrar completadas ({stats.completed})
              </Button>
            </div>
          )}
        </div>
      }
    >
      <TodoTemplate
        header={
          <div>
            <Typography variant="title">
              {filter === 'all'
                ? 'Mis Tareas'
                : filter === 'pending'
                  ? 'Pendientes'
                  : 'Completadas'}
            </Typography>
            <Typography variant="body">
              {stats.pending === 0
                ? '¡Estás al día! No hay tareas pendientes.'
                : `Tienes ${stats.pending} asuntos por resolver hoy.`}
            </Typography>
          </div>
        }
        inputSlot={<TodoInput onAdd={add} />}
        listSlot={
          <div data-testid="todo-list-container">
            <TodoList
              todos={tasks}
              onToggleTodo={toggle}
              onDeleteTodo={remove}
              emptyIcon={emptyStateProps.icon}
              emptyTitle={emptyStateProps.title}
              emptyDescription={emptyStateProps.description}
            />
          </div>
        }
      />
    </DashboardTemplate>
  );
};
