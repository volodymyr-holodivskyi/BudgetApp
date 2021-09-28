import {
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NotifyService } from './notify.service';

@Injectable({
  providedIn: 'root',
})
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private notifyService: NotifyService) {
  }
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error);

        const errorMessage = this.setError(error);
        this.notifyService.showMessage('error',errorMessage)
        return throwError(errorMessage);
      })
    );
  }

  setError(error: HttpErrorResponse): string {
    let errorMessage = 'Unknown error occured';
    console.log(error);

    if (error.error instanceof ErrorEvent) {
      // Client side error
      errorMessage = error.error.message;
    } else {
      // server side error
      if (error.status !== 0) {
        errorMessage = error.error.message;
      }
      if (error.status === 401) {
        errorMessage = error.statusText;
      }
      if (error.status === 0) {
        errorMessage = 'No connection';
      }
    }
    return errorMessage;
  }
}