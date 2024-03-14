import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, NgZone, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { TodoService } from '../../services/todo.service';
import { Todo } from 'src/app/lib/definitions';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  standalone: true,
  imports: [AsyncPipe, ReactiveFormsModule, CommonModule],
  templateUrl: './edit.component.html',
})
export default class EditTodoPageComponent {
  private readonly route = inject(ActivatedRoute);
  readonly id$ = this.route.paramMap.pipe(map((params) => params.get('id')));
  todo: Todo | undefined;
  editForm = new FormGroup({
    title: new FormControl('', Validators.required),
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private todoService: TodoService,
    private router: Router,
    private ngZone: NgZone,
  ) {}

  async getTodo() {
    this.activatedRoute.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.todoService.getTodo(id).subscribe((todo) => {
          this.todo = todo;
          this.editForm.patchValue({
            title: todo.title,
          });
        });
      }
    });
  }

  handleSubmit() {
    if (!this.todo) return;
    const title: string = this.editForm.value.title ?? '';
    this.todoService
      .editTodo(this.todo.id.toString(), title, this.todo.completed)
      .subscribe({
        next: (response) => {
          this.ngZone.run(() => {
            this.router.navigate(['/']);
          });
        },
        error: (error) => {
          console.error('error: ', error);
          alert('An error occurred while editing the todo. Please try again.');
        },
      });
  }

  ngOnInit() {
    this.getTodo();
  }
}
