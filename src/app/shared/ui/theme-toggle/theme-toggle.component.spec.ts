import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThemeService } from '../../../core/services/theme.service';
import { ThemeToggleComponent } from './theme-toggle.component';

describe('ThemeToggleComponent', () => {
  let fixture: ComponentFixture<ThemeToggleComponent>;
  let theme: ThemeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThemeToggleComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ThemeToggleComponent);
    theme = TestBed.inject(ThemeService);
    fixture.detectChanges();
  });

  it('renders one semantic switch backed by ThemeService', () => {
    const button = getButton();

    expect(button.type).toBe('button');
    expect(button.getAttribute('role')).toBe('switch');
    expect(button.hasAttribute('aria-pressed')).toBe(false);
    expect(button.getAttribute('aria-checked')).toBe('false');
    expect(button.getAttribute('aria-label')).toBe('Switch to dark theme');
    expect(button.querySelectorAll('svg[aria-hidden="true"]')).toHaveLength(4);
  });

  it('shows light as a sun knob on the right and dark as a moon knob on the left', () => {
    expect(theme.current()).toBe('light');
    expect(getButton().classList.contains('theme-toggle--dark')).toBe(false);
    expect(getKnob().querySelector('.theme-toggle__knob-icon--sun')).not.toBeNull();
    expect(getKnob().querySelector('.theme-toggle__knob-icon--moon')).not.toBeNull();

    getButton().click();
    fixture.detectChanges();

    expect(theme.current()).toBe('dark');
    expect(getButton().getAttribute('aria-checked')).toBe('true');
    expect(getButton().getAttribute('aria-label')).toBe('Switch to light theme');
    expect(getButton().classList.contains('theme-toggle--dark')).toBe(true);
  });

  it('uses decorative icon-only contents so the switch cannot overflow with text', () => {
    const button = getButton();

    expect(button.textContent?.trim()).toBe('');
    expect(button.querySelectorAll('svg[aria-hidden="true"]')).toHaveLength(4);
  });

  function getButton(): HTMLButtonElement {
    return fixture.nativeElement.querySelector('button.theme-toggle') as HTMLButtonElement;
  }

  function getKnob(): HTMLElement {
    return fixture.nativeElement.querySelector('.theme-toggle__knob') as HTMLElement;
  }
});
