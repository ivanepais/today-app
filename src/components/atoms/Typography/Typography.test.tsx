import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Typography } from './Typography';

describe('Atom: Typography', () => {
  it('should render as a paragraph by default', () => {
    render(<Typography>Texto de prueba</Typography>);
    
    const element = screen.getByText(/texto de prueba/i);
    
    // Verificamos que el tag sea un <p>
    expect(element.tagName).toBe('P');
    // Verificamos la clase por defecto
    expect(element).toHaveClass('text-body');
  });

  it('should render as an h1 when "as" prop is "h1"', () => {
    render(<Typography as="h1" variant="title">Título Principal</Typography>);
    
    const element = screen.getByText(/título principal/i);
    
    expect(element.tagName).toBe('H1');
    expect(element).toHaveClass('text-title');
  });

  it('should render with "label" variant class', () => {
    render(<Typography variant="label" as="span">Etiqueta</Typography>);
    
    const element = screen.getByText(/etiqueta/i);
    
    expect(element.tagName).toBe('SPAN');
    expect(element).toHaveClass('text-label');
  });

  it('should render children correctly', () => {
    render(
      <Typography>
        <strong>Texto negrita</strong>
      </Typography>
    );
    
    const boldElement = screen.getByText(/texto negrita/i);
    expect(boldElement.tagName).toBe('STRONG');
  });
});