import { useState, FormEvent } from 'react';
import { Input } from '../../atoms/Input/Input';
import { Button } from '../../atoms/Button/Button';
import { StyledForm } from './TodoInput.styles';

interface TodoInputProps {
  onAdd: (text: string) => void;
  placeholder?: string;
}

export const TodoInput = ({
  onAdd,
  placeholder = '¿Qué hay que hacer hoy?',
}: TodoInputProps) => {
  const [taskText, setTaskText] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const trimmedText = taskText.trim();

    if (trimmedText) {
      onAdd(trimmedText);
      setTaskText(''); // clean input
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit} aria-label="todo-form">
      <Input
        value={taskText}
        onChange={setTaskText}
        placeholder={placeholder}
      />
      <Button type="submit" variant="primary" disabled={!taskText.trim()}>
        Añadir
      </Button>
    </StyledForm>
  );
};
