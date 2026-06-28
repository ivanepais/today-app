import { describe, it, expect } from 'vitest';
import * as TaskLogic from './task.logic';

describe('Task Logic (Domain)', () => {
  describe('createTask', () => {
    it('create a valid task with clean content', () => {
      // Arrange
      const content = '  Nueva Tarea  ';

      // Act
      const task = TaskLogic.createTask(content);

      // Assert
      // Check .trim()
      expect(task.content).toBe('Nueva Tarea');
      expect(task.isCompleted).toBe(false);
      expect(task.id).toBeDefined();
      expect(typeof task.createdAt).toBe('number');
    });

    it('throw an error if the content is empty', () => {
      expect(() => TaskLogic.createTask('   ')).toThrow();
    });
  });

  describe('toggleStatus', () => {
    it('reverse the completed state and include updatedAt', () => {
      // Arrange
      const initialTask = TaskLogic.createTask('Test');

      // Act
      const updatedTask = TaskLogic.toggleStatus(initialTask);

      // Assert
      expect(updatedTask.isCompleted).toBe(true);
      expect(updatedTask.updatedAt).toBeDefined();
      
      // Immutability test: different objects in memory
      expect(initialTask.isCompleted).toBe(false);
      expect(initialTask).not.toBe(updatedTask);
    });
  });

  describe('updateContent', () => {
    it('Update the content if it is valid', () => {
      const task = TaskLogic.createTask('Viejo');
      const updated = TaskLogic.updateContent(task, 'Nuevo');

      expect(updated.content).toBe('Nuevo');
      expect(updated.updatedAt).toBeDefined();
    });

    it('do not update if the new content is empty.', () => {
      const task = TaskLogic.createTask('Importante');
      const updated = TaskLogic.updateContent(task, '   ');

      // original
      expect(updated.content).toBe('Importante');
      
      // returns the same reference if there is no change
      expect(updated).toBe(task);
    });
  });
});
