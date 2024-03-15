import { Component, NgZone, Signal } from '@angular/core';
import { TodoListComponent } from '@components/todo-list/todo-list.component';
import { AddTodoComponent } from '@components/add-todo/add-todo.component';
import { Todo } from 'src/app/lib/definitions';
import { toSignal } from '@angular/core/rxjs-interop';
import { injectLoad } from '@analogjs/router';
import { EventBusService } from '@services/event-bus.service';
import { Subscription } from 'rxjs';
import { load } from './index.server';
import { TodoService } from '@services/todo.service';

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
  data!: Signal<
    | {
        data: unknown;
        loaded: boolean;
      }
    | undefined
  >;

  //
  constructor(
    private todoService: TodoService,
    private eventBusService: EventBusService,
    private ngZone: NgZone,
  ) {
    this.populateList();

    // EVENT BUS
    this.subscription = this.eventBusService.eventStream$.subscribe((data) => {
      // delete
      if (data.todoDeleted) this.reloadList();
      // complete
      if (data.todoCompleted) {
        const todo = this.todos.find(
          (t) => t.id.toString() === data.todoCompleted,
        );
        if (todo) {
          todo.completed = !todo.completed;
        }
      }
    });
  }

  populateList() {
    try {
      this.data = toSignal(injectLoad<typeof load>(), { requireSync: true });
      const dataResult = this.data?.() ?? { loaded: false };
      if (!dataResult.loaded) {
        this.eventBusService.emitEvent({
          alert: {
            visible: true,
            message:
              'An error occurred while listing the todos. Please try again.',
          },
        });
      } else this.todos = <Todo[]>dataResult.data;
    } catch (error) {
      this.eventBusService.emitEvent({
        alert: {
          visible: true,
          message:
            'An error occurred while listing the todos. Please try again.',
        },
      });
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
        this.eventBusService.emitEvent({
          alert: {
            visible: true,
            message:
              'An error occurred while listing the todos. Please try again.',
          },
        });
      },
    });
  }

  onAddTodo(added: boolean) {
    if (added) {
      this.reloadList();
    }
  }
}
