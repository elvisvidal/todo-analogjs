import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  standalone: true,
  imports: [AsyncPipe],
  template: `ID {{ id$ | async }}`,
})
export default class EditTodoPageComponent {
  private readonly route = inject(ActivatedRoute);
  readonly id$ = this.route.paramMap.pipe(map((params) => params.get('id')));
}
