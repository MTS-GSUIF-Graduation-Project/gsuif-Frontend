import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { AppComponent, SkeletonPlaceholderComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        SkeletonPlaceholderComponent
      ],
      imports: [
        CoreModule,
        SharedModule,
        RouterModule.forRoot([
          { path: '', component: SkeletonPlaceholderComponent }
        ])
      ]
    }).compileComponents();
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
    expect(compiled.querySelector('.top-bar__brand')?.textContent).toContain('GSUIF');
  });
});
