import { Checkbox } from '../../atoms/Checkbox/Checkbox';
import { Typography } from '../../atoms/Typography/Typography';
import { IconButton } from '../../atoms/IconButton/IconButton';
import { 
  ItemContainer, 
  ContentWrapper, 
  TextContainer 
} from './TodoItem.styles';

interface TodoItemProps {
  text: string;
  completed: boolean;
  onToggle: () => void;
  onDelete: () => void;
}

export const TodoItem = ({ 
  text, 
  completed, 
  onToggle, 
  onDelete 
}: TodoItemProps) => {
  return (
    <ItemContainer $isCompleted={completed}>
      <ContentWrapper>
        <Checkbox 
          checked={completed} 
          onChange={onToggle} 
          aria-label={completed ? "Marcar como pendiente" : "Marcar como completada"}
        />
        <TextContainer $isCompleted={completed}>
          <Typography 
            variant="body" 
            color={completed ? 'textSecondary' : 'textPrimary'}
          >
            {text}
          </Typography>
        </TextContainer>
      </ContentWrapper>

      <IconButton 
        icon="🗑️" // Aquí luego pondremos un SVG real
        label="Eliminar tarea"
        onClick={onDelete}
      />
    </ItemContainer>
  );
};