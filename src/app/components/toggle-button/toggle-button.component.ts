import { Component, Input } from '@angular/core';
import { Todo } from '../../lib/definitions';
import { TodoService } from '@services/todo.service';
import { EventBusService } from '@services/event-bus.service';

@Component({
  selector: 'app-toggle-button',
  standalone: true,
  imports: [],
  templateUrl: './toggle-button.component.html',
  styleUrl: './toggle-button.component.css',
})
export class ToggleButtonComponent {
  @Input() todo: Todo | undefined;
  isCompleted = false;

  constructor(
    private todoService: TodoService,
    private eventBusService: EventBusService,
  ) {}

  handleToggle() {
    if (!this.todo) return;
    const id = this.todo.id.toString();

    this.todoService
      .editTodo(id, this.todo.title, !this.isCompleted)
      .subscribe({
        next: (response) => {
          this.isCompleted = !this.isCompleted;
          this.eventBusService.emitEvent({ todoCompleted: id });
        },
        error: (error) => {
          console.error('error: ', error);
          this.eventBusService.emitEvent({
            alert: {
              visible: true,
              message:
                'An error occurred while completing the todo. Please try again.',
            },
          });
        },
      });
  }

  ngOnInit() {
    if (this.todo) {
      this.isCompleted = this.todo.completed;
    }
  }
}
