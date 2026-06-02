import { render, screen } from '../../../test/utils';
import { describe, it, expect } from 'vitest';
import { TodoTemplate } from './TodoTemplate';

describe('Template: TodoTemplate', () => {
  const mockHeader = <h1>Task Manager</h1>;
  const mockInput = <button>Add Task Slot</button>;
  const mockList = <ul><li>Task List Slot</li></ul>;

  it('render all provided slots correctly', () => {
    render(
      <TodoTemplate
        header={mockHeader}
        inputSlot={mockInput}
        listSlot={mockList}
      />
    );

    // Check slot contents
    expect(screen.getByText('Task Manager')).toBeInTheDocument();
    expect(screen.getByText('Add Task Slot')).toBeInTheDocument();
    expect(screen.getByText('Task List Slot')).toBeInTheDocument();
  });

  it('maintain the semantic HTML structure', () => {
    const { container } = render(
      <TodoTemplate
        header={<div>Header</div>}
        inputSlot={<div>Input</div>}
        listSlot={<div>List</div>}
      />
    );

    // PageWrapper <div>
    expect(container.querySelector('div')).toBeInTheDocument();
    
    // Tag <header>
    expect(container.querySelector('header')).toBeInTheDocument();
    
    // input, list sections
    const sections = container.querySelectorAll('section');
    expect(sections.length).toBeGreaterThanOrEqual(2);
  });

  it('have the header section styled for the title', () => {
    const { container } = render(
      <TodoTemplate
        header={<div>Title</div>}
        inputSlot={null}
        listSlot={null}
      />
    );
    
    const header = container.querySelector('header');
    expect(header).toBeInTheDocument();
    expect(header).toHaveStyle({ 'text-align': 'center' });
  });
});