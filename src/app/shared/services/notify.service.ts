import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotifyService {
  constructor(private toastrService: ToastrService) {}

  showMessage(type: string, message: string, title?: string) {
    switch (type) {
      case 'success':
        return this.toastrService.success(message, title);
      case 'error':
        return this.toastrService.error(message, title);
      default:
        return this.toastrService.show(message, title);
    }
  }
}