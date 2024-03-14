import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TodoService } from '@services/todo.service';
import { EventBusService } from '@services/event-bus.service';

@Component({
  selector: 'app-add-todo',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-todo.component.html',
  styleUrl: './add-todo.component.css',
})
export class AddTodoComponent {
  @Output() addTodoEvent = new EventEmitter<boolean>();
  addForm = new FormGroup({
    title: new FormControl('', Validators.required),
  });

  constructor(
    private todoService: TodoService,
    private eventBusService: EventBusService,
  ) {}

  async handleSubmit() {
    const title: string = this.addForm.value.title ?? '';
    this.todoService.addTodo(title).subscribe({
      next: (response) => {
        this.addForm.patchValue({
          title: '',
        });
        this.addTodoEvent.emit(true);
      },
      error: (error) => {
        console.error('error: ', error);
        this.eventBusService.emitEvent({
          alert: {
            visible: true,
            message:
              'An error occurred while adding the todo. Please try again.',
          },
        });
      },
    });
  }
}
