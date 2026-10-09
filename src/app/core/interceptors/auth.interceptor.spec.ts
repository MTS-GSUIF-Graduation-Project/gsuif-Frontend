import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { authInterceptor } from './auth.interceptor';
import { AuthService } from '../services/auth.service';

describe('authInterceptor', () => {
  let http: HttpClient;
  let controller: HttpTestingController;
  let auth: { getToken: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    auth = { getToken: vi.fn() };

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
        { provide: AuthService, useValue: auth }
      ]
    });

    http = TestBed.inject(HttpClient);
    controller = TestBed.inject(HttpTestingController);
  });

  afterEach(() => controller.verify());

  it('adds Authorization when a token exists', () => {
    auth.getToken.mockReturnValue('jwt-value');

    http.get('/api/v1/projects').subscribe();
    const request = controller.expectOne('/api/v1/projects');

    expect(request.request.headers.get('Authorization')).toBe('Bearer jwt-value');
    request.flush({});
  });

  it('does not add Authorization without a token', () => {
    auth.getToken.mockReturnValue(null);

    http.get('/api/v1/projects').subscribe();
    const request = controller.expectOne('/api/v1/projects');

    expect(request.request.headers.has('Authorization')).toBe(false);
    request.flush({});
  });
});
