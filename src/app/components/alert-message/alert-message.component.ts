import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert-message.component.html',
  styleUrl: './alert-message.component.css',
})
export class AlertMessageComponent {
  @Input() alertMessage: { visible: boolean; message: string } = {
    visible: false,
    message: '',
  };

  hideError() {
    this.alertMessage.visible = false;
    this.alertMessage.message = '';
  }
}
