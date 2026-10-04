import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-state',
  standalone: false,
  templateUrl: './loading-state.component.html',
  styleUrl: './loading-state.component.css'
})
export class LoadingStateComponent {
  @Input() label = 'Loading.';
}
