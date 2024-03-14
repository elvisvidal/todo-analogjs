import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { EventBusService } from '@services/event-bus.service';
import { AlertMessageComponent } from '@components/alert-message/alert-message.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AlertMessageComponent],
  template: `<div class="mx-auto max-w-4xl px-4">
    <app-alert-message [alertMessage]="{ visible, message }" />
    <router-outlet></router-outlet>
  </div>`,
})
export class AppComponent {
  private subscription: Subscription;
  visible: boolean = false;
  message: string = '';

  constructor(private eventBusService: EventBusService) {
    this.subscription = this.eventBusService.eventStream$.subscribe((data) => {
      if (data.alert) {
        this.visible = data.alert.visible;
        this.message = data.alert.message;
      }
    });
  }
}
