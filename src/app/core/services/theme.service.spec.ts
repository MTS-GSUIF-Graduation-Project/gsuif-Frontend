import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  it('toggles the document theme attribute', () => {
    const service = TestBed.inject(ThemeService);

    expect(service.current()).toBe('light');
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');

    service.toggle();

    expect(service.current()).toBe('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });
});
