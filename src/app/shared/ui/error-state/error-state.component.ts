import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-error-state',
  standalone: false,
  templateUrl: './error-state.component.html',
  styleUrl: './error-state.component.css'
})
export class ErrorStateComponent {
  @Input() message = '';
  @Input() retryLabel = '';
  @Output() retry = new EventEmitter<void>();
}
