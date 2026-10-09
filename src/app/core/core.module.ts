import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { authInterceptor } from './interceptors/auth.interceptor';
import { errorInterceptor } from './interceptors/error.interceptor';

@NgModule({
  providers: [
    provideHttpClient(withInterceptors([authInterceptor, errorInterceptor]))
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule | null) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in AppModule only.');
    }
  }
}
