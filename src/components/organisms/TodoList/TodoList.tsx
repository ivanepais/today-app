import { TodoItem } from '../../molecules/TodoItem/TodoItem';
import { Typography } from '../../atoms/Typography/Typography';
import { ListWrapper, StyledList, EmptyState } from './TodoList.styles';
import type { Task } from '@/core/task.entity';

interface TodoListProps {
  todos: Task[];
  onToggleTodo: (id: string) => void;
  onDeleteTodo: (id: string) => void;
  isSearching: boolean;
}

export const TodoList = ({
  todos,
  onToggleTodo,
  onDeleteTodo,
  isSearching,
}: TodoListProps) => {
  const hasTodos = todos.length > 0;

  return (
    <ListWrapper>
      {!hasTodos ? (
        <EmptyState>
          {/* Cambiamos el icono y el texto según si es búsqueda o lista vacía */}
          <span style={{ fontSize: '3rem', marginBottom: '1rem' }}>
            {isSearching ? '🔍' : '📝'}
          </span>

          <Typography variant="body">
            {isSearching ? 'No hay coincidencias' : 'No hay tareas pendientes'}
          </Typography>

          <Typography variant="body" style={{ marginTop: '8px' }}>
            {isSearching
              ? 'Prueba con otros términos o limpia el buscador.'
              : '¡Añade algo para empezar el día!'}
          </Typography>
        </EmptyState>
      ) : (
        <StyledList>
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              id={todo.id}
              text={todo.content}
              completed={todo.isCompleted}
              onToggle={onToggleTodo}
              onDelete={onDeleteTodo}
            />
          ))}
        </StyledList>
      )}
    </ListWrapper>
  );
};
