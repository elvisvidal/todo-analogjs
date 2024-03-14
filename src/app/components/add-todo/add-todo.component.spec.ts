import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTodoComponent } from './add-todo.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TodoService } from '../../services/todo.service';
import { By } from '@angular/platform-browser';

describe('AddTodoComponent', () => {
  let component: AddTodoComponent;
  let fixture: ComponentFixture<AddTodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTodoComponent, HttpClientTestingModule],
      providers: [TodoService],
    }).compileComponents();

    fixture = TestBed.createComponent(AddTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('emits an "addTodoEvent" event with valid form submission', (done) => {
    const expectedTodoTitle = 'New Todo';

    // Subscribe to the EventEmitter
    component.addTodoEvent.subscribe((event) => {
      expect(event).toEqual(expectedTodoTitle);
      done;
    });

    // Simulate user input
    const inputElement = fixture.debugElement.query(
      By.css('input'),
    ).nativeElement;
    inputElement.value = expectedTodoTitle;
    inputElement.dispatchEvent(new Event('input'));

    // Simulate form submission
    const formElement = fixture.debugElement.query(
      By.css('form'),
    ).nativeElement;
    formElement.dispatchEvent(new Event('submit'));
  });

  it('does not emit "addTodoEvent" with invalid input', (done) => {
    let emissionOccurred = false;

    component.addTodoEvent.subscribe(() => {
      emissionOccurred = true;
    });

    component.addForm.controls['title'].setValue('');
    fixture.detectChanges();

    // Simulate form submission
    const form = fixture.debugElement.query(By.css('form')).nativeElement;
    form.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    // Use a slight delay to check for emission, then verify it did not occur.
    setTimeout(() => {
      expect(emissionOccurred).toBe(false);
      done;
    }, 100);
  });
});
