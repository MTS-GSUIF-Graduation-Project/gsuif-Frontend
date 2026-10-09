import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { AuthService } from './core/services/auth.service';

describe('AppComponent', () => {
  beforeEach(async () => {
    sessionStorage.clear();

    await TestBed.configureTestingModule({
      imports: [
        AppModule
      ]
    }).compileComponents();
  });

  afterEach(() => {
    sessionStorage.clear();
  });

  it('creates the shell', () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders the product name and skip link', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.skip-link')?.textContent).toContain('Skip to content');
    expect(compiled.querySelector('.top-bar__brand')?.textContent).toContain('MetaFrame');
  });

  it('does not render account controls when signed out', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.top-bar__user')).toBeNull();
    expect(compiled.querySelector('button.button--secondary')).toBeNull();
    expect(compiled.querySelector('app-theme-toggle')).not.toBeNull();
  });

  it('renders the signed-in user and wires logout through AuthService', () => {
    sessionStorage.setItem('gsuif.auth', JSON.stringify({
      token: 'token-123',
      tokenType: 'Bearer',
      username: 'Ada Lovelace',
      roles: ['USER']
    }));
    const auth = TestBed.inject(AuthService);
    const logout = vi.spyOn(auth, 'logout');
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const logoutButton = compiled.querySelector<HTMLButtonElement>('button.button--secondary');

    expect(compiled.querySelector('.top-bar__user')?.textContent).toContain('Ada Lovelace');
    expect(logoutButton?.textContent).toContain('Logout');

    logoutButton?.click();

    expect(logout).toHaveBeenCalledOnce();
    expect(logout).toHaveBeenCalledWith();
  });
});
