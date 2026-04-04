import { render, screen } from '../../../test/utils';
import { describe, it, expect } from 'vitest';
import { TodoTemplate } from './TodoTemplate';

describe('Template: TodoTemplate', () => {
  const mockHeader = <h1>Task Manager</h1>;
  const mockInput = <button>Add Task Slot</button>;
  const mockList = <ul><li>Task List Slot</li></ul>;

  it('should render all provided slots correctly', () => {
    render(
      <TodoTemplate
        header={mockHeader}
        inputSlot={mockInput}
        listSlot={mockList}
      />
    );

    // Verificamos que el contenido de cada slot esté presente
    expect(screen.getByText('Task Manager')).toBeInTheDocument();
    expect(screen.getByText('Add Task Slot')).toBeInTheDocument();
    expect(screen.getByText('Task List Slot')).toBeInTheDocument();
  });

  it('should maintain the semantic HTML structure', () => {
    const { container } = render(
      <TodoTemplate
        header={<div>Header</div>}
        inputSlot={<div>Input</div>}
        listSlot={<div>List</div>}
      />
    );

    // El PageWrapper debe ser un <main>
    expect(screen.getByRole('main')).toBeInTheDocument();
    
    // Debe existir una etiqueta <header>
    expect(container.querySelector('header')).toBeInTheDocument();
    
    // Debe haber secciones para el input y la lista
    const sections = container.querySelectorAll('section');
    expect(sections.length).toBeGreaterThanOrEqual(2);
  });

  it('should have the header section styled for the title', () => {
    const { container } = render(
      <TodoTemplate
        header={<div>Title</div>}
        inputSlot={null}
        listSlot={null}
      />
    );
    
    const header = container.querySelector('header');
    expect(header).toBeInTheDocument();
    // Verificamos el alineado al centro definido en los estilos
    expect(header).toHaveStyle({ 'text-align': 'center' });
  });
});