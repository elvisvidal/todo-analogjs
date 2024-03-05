import { Component } from '@angular/core';
import { TodoListComponent } from '../components/todo-list/todo-list.component';
import { AddTodoComponent } from '../components/add-todo/add-todo.component';
import { Todo } from 'src/app/lib/definitions';
import { toSignal } from '@angular/core/rxjs-interop';
import { injectLoad } from '@analogjs/router';

import { load } from './index.server';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AddTodoComponent, TodoListComponent],
  template: `
    <h1 class="my-4 text-center text-2xl font-bold">Todo List</h1>
    <app-add-todo />
    <app-todo-list [list]="todos" />
  `,
})
export default class HomeComponent {
  todos: Todo[] = [];
  data = toSignal(injectLoad<typeof load>(), { requireSync: true });

  constructor() {
    this.populateList();
  }

  populateList() {
    if (this.data().loaded) {
      this.todos = <Todo[]>this.data().data;
    }
  }
}
