import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { NotifyService } from './notify.service';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private injector: Injector, private zone: NgZone) {}

  handleError(error: any) {
    const notifier = this.injector.get(NotifyService);
    const router = this.injector.get(Router);
    this.zone.run(() => {
      if (error === 'Unauthorized') router.navigate(['/login']);

      if (typeof error !== 'string') {
        notifier.showMessage('error', error.message);
      }
    });
    console.error(error);
  }
}
