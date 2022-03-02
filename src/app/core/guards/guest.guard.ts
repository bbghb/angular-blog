import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Injectable()
export class GuestGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.authService.isLoggedIn$.pipe(
      map(isLoggedIn => !isLoggedIn),
      tap(isGuest => {
        if (!isGuest) {
          this.router.navigate(['/']);
        }
      }),
    );
  }
}
