import { Component, inject } from '@angular/core';
import { NotificationService } from './core/services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  protected readonly notifications = inject(NotificationService);
}

@Component({
  selector: 'app-skeleton-placeholder',
  standalone: false,
  template: `
    <section class="route-surface" aria-labelledby="page-title">
      <app-page-header title="GSUIF"></app-page-header>
      <p>Frontend skeleton.</p>
    </section>
  `
})
export class SkeletonPlaceholderComponent {
}
