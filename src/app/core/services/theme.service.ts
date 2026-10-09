import { DOCUMENT } from '@angular/common';
import { Injectable, computed, inject, signal } from '@angular/core';

export type ThemeMode = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly mode = signal<ThemeMode>('light');
  readonly current = computed(() => this.mode());

  constructor() {
    this.apply('light');
  }

  toggle(): void {
    this.apply(this.mode() === 'light' ? 'dark' : 'light');
  }

  private apply(mode: ThemeMode): void {
    this.mode.set(mode);
    this.document.documentElement.setAttribute('data-theme', mode);
  }
}
