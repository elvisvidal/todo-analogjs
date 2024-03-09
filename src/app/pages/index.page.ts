import { Component, NgZone } from '@angular/core';
import { TodoListComponent } from '../components/todo-list/todo-list.component';
import { AddTodoComponent } from '../components/add-todo/add-todo.component';
import { Todo } from 'src/app/lib/definitions';
import { toSignal } from '@angular/core/rxjs-interop';
import { injectLoad } from '@analogjs/router';
import { EventBusService } from '../services/event-bus.service';
import { Subscription } from 'rxjs';
import { load } from './index.server';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AddTodoComponent, TodoListComponent],
  template: `
    <h1 class="my-4 text-center text-2xl font-bold">Todo List</h1>
    <app-add-todo (addTodoEvent)="onAddTodo($event)" />
    <app-todo-list [list]="todos" />
  `,
})
export default class HomeComponent {
  private subscription: Subscription;
  todos: Todo[] = [];
  data = toSignal(injectLoad<typeof load>(), { requireSync: true });

  constructor(
    private todoService: TodoService,
    private eventBusService: EventBusService,
    private ngZone: NgZone,
  ) {
    this.populateList();

    // on delete
    this.subscription = this.eventBusService.eventStream$.subscribe((data) => {
      if (data.todoDeleted) this.reloadList();
    });
  }

  populateList() {
    if (this.data().loaded) {
      this.todos = <Todo[]>this.data().data;
    }
  }

  reloadList() {
    this.todoService.listTodo().subscribe({
      next: (response) => {
        this.ngZone.run(() => {
          this.todos = [...response];
        });
      },
      error: (error) => {
        console.error('error: ', error);
        alert('An error occurred while listing the todo. Please try again.');
      },
    });
  }

  onAddTodo(added: boolean) {
    if (added) {
      this.reloadList();
    }
  }
}
