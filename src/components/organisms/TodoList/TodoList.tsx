import { TodoItem } from '../../molecules/TodoItem/TodoItem';
import { Typography } from '../../atoms/Typography/Typography';
import { ListWrapper, StyledList, EmptyState } from './TodoList.styles';
import type { Task } from '@/core/task.entity';

interface TodoListProps {
  todos: Task[];
  onToggleTodo: (id: string) => void;
  onDeleteTodo: (id: string) => void;
  emptyIcon: string;
  emptyTitle: string;
  emptyDescription: string;
}

export const TodoList = ({
  todos,
  onToggleTodo,
  onDeleteTodo,
  emptyIcon,
  emptyTitle,
  emptyDescription,
}: TodoListProps) => {
  const hasTodos = todos.length > 0;

  return (
    <ListWrapper>
      {!hasTodos ? (
        <EmptyState>
          <span
            style={{ fontSize: '3rem', marginBottom: '1rem' }}
            role="img"
            aria-label="estado-vacio"
          >
            {emptyIcon}
          </span>

          <Typography variant="body">
            {emptyTitle}
          </Typography>

          <Typography variant="body">
            {emptyDescription}
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
