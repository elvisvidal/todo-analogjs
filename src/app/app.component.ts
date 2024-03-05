import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<div class="mx-auto max-w-4xl px-4">
    <router-outlet></router-outlet>
  </div>`,
})
export class AppComponent {}
