import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-edit-link',
  standalone: true,
  imports: [],
  templateUrl: './edit-link.component.html',
  styleUrl: './edit-link.component.css',
})
export class EditLinkComponent {
  @Input() todoId: string | number = 0;
}
