// Import statements for Vitest
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { DeleteButtonComponent } from './delete-button.component';
import { TodoService } from '@services/todo.service';
import { EventBusService } from '@services/event-bus.service';
import { of, throwError } from 'rxjs';

describe('DeleteButtonComponent', () => {
  let component: DeleteButtonComponent;
  let mockTodoService: Partial<TodoService>;
  let mockEventBusService: Partial<EventBusService>;

  beforeAll(() => {
    global.console.error = vi.fn();
  });

  beforeEach(() => {
    // Mock the services with Vitest
    mockTodoService = {
      deleteTodo: vi.fn().mockReturnValue(of({})), // Default to success
    };

    mockEventBusService = {
      emitEvent: vi.fn().mockImplementation((event) => {
        // Logic to handle event emissions
      }),
    };

    // Manually instantiate the component with mocks
    component = new DeleteButtonComponent(
      mockTodoService as TodoService,
      mockEventBusService as EventBusService,
    );
  });

  afterAll(() => {
    global.console.error.mockRestore();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('emits an event on successful deletion', async () => {
    component.todoId = '123';
    await component.handleClick();

    expect(mockTodoService.deleteTodo).toHaveBeenCalledWith('123');
    // Check if emitEvent was called with the expected argument
    expect(mockEventBusService.emitEvent).toHaveBeenCalledWith({
      todoDeleted: true,
    });
  });

  it('emits an alert event on deletion failure', async () => {
    // Set the deleteTodo method to return an error
    mockTodoService.deleteTodo.mockReturnValue(
      throwError(() => new Error('Failed to delete')),
    );

    component.todoId = '123';
    await component.handleClick();

    expect(mockTodoService.deleteTodo).toHaveBeenCalledWith('123');
    // Check if emitEvent was called with the expected argument
    expect(mockEventBusService.emitEvent).toHaveBeenCalledWith({
      alert: {
        visible: true,
        message: 'An error occurred while deleting the todo. Please try again.',
      },
    });
  });
});
