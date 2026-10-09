import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EmptyStateComponent } from './ui/empty-state/empty-state.component';
import { ErrorStateComponent } from './ui/error-state/error-state.component';
import { LoadingStateComponent } from './ui/loading-state/loading-state.component';
import { NotificationBannerComponent } from './ui/notification-banner/notification-banner.component';
import { PageHeaderComponent } from './ui/page-header/page-header.component';
import { ThemeToggleComponent } from './ui/theme-toggle/theme-toggle.component';

@NgModule({
  declarations: [
    EmptyStateComponent,
    ErrorStateComponent,
    LoadingStateComponent,
    NotificationBannerComponent,
    PageHeaderComponent,
    ThemeToggleComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    EmptyStateComponent,
    ErrorStateComponent,
    LoadingStateComponent,
    NotificationBannerComponent,
    PageHeaderComponent,
    ThemeToggleComponent
  ]
})
export class SharedModule { }
