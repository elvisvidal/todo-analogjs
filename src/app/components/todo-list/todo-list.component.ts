import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditLinkComponent } from '@components/edit-link/edit-link.component';
import { DeleteButtonComponent } from '@components/delete-button/delete-button.component';
import { Todo } from 'src/app/lib/definitions';
import { ToggleButtonComponent } from '@components/toggle-button/toggle-button.component';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    CommonModule,
    ToggleButtonComponent,
    EditLinkComponent,
    DeleteButtonComponent,
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListComponent {
  @Input() list: Todo[] = [];

  trackById(index: number, todo: Todo): number {
    return todo.id;
  }
}
