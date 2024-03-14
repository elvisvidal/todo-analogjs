import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ToggleButtonComponent } from './toggle-button.component';
import { TodoService } from '@services/todo.service';
import { EventBusService } from '@services/event-bus.service';
import { of, throwError } from 'rxjs';

describe('ToggleButtonComponent', () => {
  let component: ToggleButtonComponent;
  let mockTodoService: Partial<TodoService>;
  let mockEventBusService: Partial<EventBusService>;

  beforeAll(() => {
    global.console.error = vi.fn();
  });

  beforeEach(() => {
    mockTodoService = {
      editTodo: vi.fn().mockReturnValue(of({})), // Assume success by default
    };

    mockEventBusService = {
      emitEvent: vi.fn(),
    };

    component = new ToggleButtonComponent(
      mockTodoService as TodoService,
      mockEventBusService as EventBusService,
    );
    component.todo = { id: 123, title: 'Test Todo', completed: false }; // Example todo
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  afterAll(() => {
    global.console.error.mockRestore();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('emits an event on successful toggle', async () => {
    await component.handleToggle();

    expect(mockTodoService.editTodo).toHaveBeenCalledWith(
      '123',
      'Test Todo',
      true,
    );
    expect(mockEventBusService.emitEvent).toHaveBeenCalledWith({
      todoCompleted: '123',
    });
    expect(component.isCompleted).toBe(true);
  });

  it('shows an alert on toggle failure', async () => {
    mockTodoService.editTodo = vi
      .fn()
      .mockReturnValue(throwError(() => new Error('Failed to complete')));

    await component.handleToggle();

    expect(mockTodoService.editTodo).toHaveBeenCalledWith(
      '123',
      'Test Todo',
      true,
    );
    expect(mockEventBusService.emitEvent).toHaveBeenCalledWith({
      alert: {
        visible: true,
        message:
          'An error occurred while completing the todo. Please try again.',
      },
    });
    // The component.isCompleted should not change on failure
    expect(component.isCompleted).toBe(false);
  });
});
