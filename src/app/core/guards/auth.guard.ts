import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

import { AuthService } from '../../auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.authService.isLoggedIn$.pipe(
      tap(isLoggedIn => {
        if (!isLoggedIn) {
          this.router.navigate(['/']);
        }
      })
    );
  }
}
