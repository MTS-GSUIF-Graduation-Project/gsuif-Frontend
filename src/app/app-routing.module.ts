import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { loginGuard } from './core/guards/login.guard';
import { LoginComponent } from './features/auth/login/login.component';
import { ProtectedPlaceholderComponent } from './app.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [loginGuard] },
  { path: 'home', component: ProtectedPlaceholderComponent, canActivate: [authGuard] },
  { path: 'projects', component: ProtectedPlaceholderComponent, canActivate: [authGuard] },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
