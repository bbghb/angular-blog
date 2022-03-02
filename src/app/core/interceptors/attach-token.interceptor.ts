import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from '../../auth/auth.service';

const TOKEN = '9aK4W3D7NpbWwPzJmUOIcyPmyehl0PHZLWP14rzQqKzUPtcFCo0Tn051CvwN';

@Injectable()
export class AttachTokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.isLoggedIn() && ['post', 'put', 'patch', 'delete'].includes(req.method.toLowerCase())) {
      return next.handle(req.clone({
        params: (req.params || new HttpParams()).set('api_token', TOKEN)
      }));
    }

    return next.handle(req);
  }
}
