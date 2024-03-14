import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListComponent } from './todo-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoListComponent, HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(new Map([['id', '123']])), // Mock paramMap observable
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders the correct number of todo items', () => {
    component.list = [
      { id: 1, title: 'Todo 1', completed: false },
      { id: 2, title: 'Todo 2', completed: true },
    ];
    fixture.detectChanges(); // Trigger change detection to apply the new todos

    const compiled = fixture.nativeElement as HTMLElement;
    const todoItems = compiled.querySelectorAll('.todo-item');
    expect(todoItems.length).toEqual(2);
  });

  it('applies "completed" class to completed todos', () => {
    component.list = [
      { id: 1, title: 'Todo 1', completed: false },
      { id: 2, title: 'Todo 2', completed: true },
    ];
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const completedTodos = compiled.querySelectorAll('.todo-item.completed');
    expect(completedTodos.length).toEqual(1);
  });
});
