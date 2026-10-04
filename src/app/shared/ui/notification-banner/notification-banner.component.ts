import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-notification-banner',
  standalone: false,
  templateUrl: './notification-banner.component.html',
  styleUrl: './notification-banner.component.css'
})
export class NotificationBannerComponent {
  @Input({ required: true }) message = '';
  @Output() dismissed = new EventEmitter<void>();
}
