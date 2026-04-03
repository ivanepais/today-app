// Importa desde tu utility, no directamente de testing-library
import { render, screen } from '../../../test/utils'; 
import { describe, it, expect } from 'vitest';
import { Typography } from './Typography';
import { theme } from '../../../styles/theme'; // Para comparar valores exactos

describe('Atom: Typography', () => {
  it('should render as a paragraph by default', () => {
    render(<Typography>Texto de prueba</Typography>);
    
    const element = screen.getByText(/texto de prueba/i);
    
    expect(element.tagName).toBe('P');
    
    // SIN CLASES: Verificamos el estilo real
    expect(element).toHaveStyle({
      'font-size': theme.typography.fontSize.md,
      'color': theme.colors.textPrimary
    });
  });

  it('should render as an h1 when "as" prop is "h1"', () => {
    render(<Typography as="h1" variant="title">Título Principal</Typography>);
    
    const element = screen.getByText(/título principal/i);
    
    expect(element.tagName).toBe('H1');
    expect(element).toHaveStyle({
      'font-weight': theme.typography.fontWeight.bold.toString()
    });
  });

  it('should render with "label" variant styles', () => {
    render(<Typography variant="label" as="span">Etiqueta</Typography>);
    
    const element = screen.getByText(/etiqueta/i);
    
    expect(element.tagName).toBe('SPAN');
    // Verificamos transformación a mayúsculas del label
    expect(element).toHaveStyle({
      'text-transform': 'uppercase'
    });
  });
});