import { TodoItem } from '../../molecules/TodoItem/TodoItem';
import { Typography } from '../../atoms/Typography/Typography';
import { ListWrapper, StyledList, EmptyState } from './TodoList.styles';
import type { Task } from '@/core/task.entity';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface TodoListProps {
  todos: Task[];
  onToggleTodo: (id: string) => void;
  onDeleteTodo: (id: string) => void;
}

export const TodoList = ({ 
  todos, 
  onToggleTodo, 
  onDeleteTodo 
}: TodoListProps) => {
  const hasTodos = todos.length > 0;

  return (
    <ListWrapper>
      {!hasTodos ? (
        <EmptyState>
          <span style={{ fontSize: '3rem' }}>📝</span>
          <Typography variant="h3" color="textSecondary">
            No hay tareas pendientes
          </Typography>
          <Typography variant="body" color="textSecondary">
            ¡Añade algo para empezar el día!
          </Typography>
        </EmptyState>
      ) : (
        <StyledList>
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              text={todo.content}
              completed={todo.isCompleted}
              onToggle={() => onToggleTodo(todo.id)}
              onDelete={() => onDeleteTodo(todo.id)}
            />
          ))}
        </StyledList>
      )}
    </ListWrapper>
  );
};