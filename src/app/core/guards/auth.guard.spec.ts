import { TestBed } from '@angular/core/testing';
import { Router, UrlTree } from '@angular/router';
import { authGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';

describe('authGuard', () => {
  it('allows navigation when authenticated', () => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: { isLoggedIn: () => true } },
        { provide: Router, useValue: { parseUrl: vi.fn() } }
      ]
    });

    expect(TestBed.runInInjectionContext(() => authGuard({} as never, {} as never))).toBe(true);
  });

  it('redirects to login when unauthenticated', () => {
    const tree = {} as UrlTree;
    const router = { parseUrl: vi.fn(() => tree) };

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: { isLoggedIn: () => false } },
        { provide: Router, useValue: router }
      ]
    });

    expect(TestBed.runInInjectionContext(() => authGuard({} as never, {} as never))).toBe(tree);
    expect(router.parseUrl).toHaveBeenCalledWith('/login');
  });
});
