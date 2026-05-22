import { Checkbox } from '../../atoms/Checkbox/Checkbox';
import { Typography } from '../../atoms/Typography/Typography';
import { IconButton } from '../../atoms/IconButton/IconButton';
import {
  ItemContainer,
  ContentWrapper,
  TextContainer,
} from './TodoItem.styles';

interface TodoItemProps {
  id: string;
  text: string;
  completed: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TodoItem = ({
  id,
  text,
  completed,
  onToggle,
  onDelete,
}: TodoItemProps) => {
  const checkboxId = `todo-check-${id}`;

  const handleToggle = () => onToggle(id);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onDelete(id);
  };

  return (
    <ItemContainer $isCompleted={completed}>
      <ContentWrapper as="label" htmlFor={checkboxId}>
        <Checkbox
          id={checkboxId}
          checked={completed}
          onChange={handleToggle}
          aria-label={
            completed ? 'Marcar como pendiente' : 'Marcar como completada'
          }
        />
        <TextContainer $isCompleted={completed}>
          <Typography variant="body">{text}</Typography>
        </TextContainer>
      </ContentWrapper>

      <IconButton
        icon="🗑️" // SVG
        label="Eliminar tarea"
        onClick={handleDelete}
      />
    </ItemContainer>
  );
};
