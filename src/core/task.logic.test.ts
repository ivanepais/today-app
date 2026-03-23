import { describe, it, expect } from 'vitest';
import * as TaskLogic from './task.logic';
import { Task } from './task.entity';

describe('Task Logic (Domain)', () => {
  
  describe('createTask', () => {
    it('debería crear una tarea válida con contenido limpio', () => {
      // Arrange
      const content = '  Nueva Tarea  ';
      
      // Act
      const task = TaskLogic.createTask(content);

      // Assert
      expect(task.content).toBe('Nueva Tarea'); // Verifica el .trim()
      expect(task.isCompleted).toBe(false);
      expect(task.id).toBeDefined();
      expect(typeof task.createdAt).toBe('number');
    });

    it('debería lanzar un error si el contenido está vacío', () => {
      expect(() => TaskLogic.createTask('   ')).toThrow();
    });
  });

  describe('toggleStatus', () => {
    it('debería invertir el estado de completado e incluir updatedAt', () => {
      // Arrange
      const initialTask = TaskLogic.createTask('Test');
      
      // Act
      const updatedTask = TaskLogic.toggleStatus(initialTask);

      // Assert
      expect(updatedTask.isCompleted).toBe(true);
      expect(updatedTask.updatedAt).toBeDefined();
      // Prueba de Inmutabilidad:
      expect(initialTask.isCompleted).toBe(false); 
      expect(initialTask).not.toBe(updatedTask); // Son objetos diferentes en memoria
    });
  });

  describe('updateContent', () => {
    it('debería actualizar el contenido si es válido', () => {
      const task = TaskLogic.createTask('Viejo');
      const updated = TaskLogic.updateContent(task, 'Nuevo');
      
      expect(updated.content).toBe('Nuevo');
      expect(updated.updatedAt).toBeDefined();
    });

    it('no debería actualizar si el nuevo contenido es vacío', () => {
      const task = TaskLogic.createTask('Importante');
      const updated = TaskLogic.updateContent(task, '   ');
      
      expect(updated.content).toBe('Importante'); // Mantiene el original
      expect(updated).toBe(task); // Pragmático: devuelve la misma referencia si no hay cambio
    });
  });
});