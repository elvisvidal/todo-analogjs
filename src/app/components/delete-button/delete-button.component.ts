import { Component, Input } from '@angular/core';
import { TodoService } from '@services/todo.service';
import { EventBusService } from '@services/event-bus.service';

@Component({
  selector: 'app-delete-button',
  standalone: true,
  imports: [],
  templateUrl: './delete-button.component.html',
  styleUrl: './delete-button.component.css',
})
export class DeleteButtonComponent {
  @Input() todoId: string = '';

  constructor(
    private todoService: TodoService,
    private eventBusService: EventBusService,
  ) {}

  handleClick() {
    this.todoService.deleteTodo(this.todoId).subscribe({
      next: (response) => {
        this.eventBusService.emitEvent({ todoDeleted: true });
      },
      error: (error) => {
        console.error('error: ', error);
        this.eventBusService.emitEvent({
          alert: {
            visible: true,
            message:
              'An error occurred while deleting the todo. Please try again.',
          },
        });
      },
    });
  }
}
