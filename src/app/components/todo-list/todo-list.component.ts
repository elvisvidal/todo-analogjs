import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditLinkComponent } from '../edit-link/edit-link.component';
import { DeleteButtonComponent } from '../delete-button/delete-button.component';
type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, EditLinkComponent, DeleteButtonComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListComponent {
  todos: Todo[] = [
    { id: 1, title: 'Learn Angular', completed: false },
    { id: 2, title: 'Build a Todo App', completed: false },
    { id: 3, title: 'Explore more features', completed: false },
  ];

  trackById(index: number, todo: Todo): number {
    return todo.id;
  }
}
