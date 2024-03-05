import { Component } from '@angular/core';
import { TodoListComponent } from '../components/todo-list/todo-list.component';
import { AddTodoComponent } from '../components/add-todo/add-todo.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AddTodoComponent, TodoListComponent],
  template: `
    <h1 class="my-4 text-center text-2xl font-bold">Todo List</h1>
    <app-add-todo />
    <app-todo-list />
  `,
})
export default class HomeComponent {}
