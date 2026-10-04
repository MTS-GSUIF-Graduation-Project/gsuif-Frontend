import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private readonly busyKeys = signal(new Set<string>());

  begin(key: string): void {
    this.busyKeys.update(keys => new Set(keys).add(key));
  }

  end(key: string): void {
    this.busyKeys.update(keys => {
      const next = new Set(keys);
      next.delete(key);
      return next;
    });
  }

  isBusy(key: string): boolean {
    return this.busyKeys().has(key);
  }
}
