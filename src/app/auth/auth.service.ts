import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';

interface AuthCredentials {
  email: string;
  password: string;
}

const CREDENTIALS: AuthCredentials = {
  email: 'admin@example.com',
  password: 'password'
};

function verifyCredentials(credentials: AuthCredentials): boolean {
  return CREDENTIALS.email === credentials.email && CREDENTIALS.password === credentials.password;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private storage: Storage;
  private readonly status$: BehaviorSubject<boolean>;

  isLoggedIn$: Observable<boolean>;

  constructor() {
    this.storage = localStorage;
    this.status$ = new BehaviorSubject<boolean>((this.storage.getItem('auth') && true) || false);
    this.isLoggedIn$ = this.status$.asObservable();
  }

  login(credentials: AuthCredentials) {
    return of(verifyCredentials(credentials)).pipe(
      tap(status => {
        if (status) this.storage.setItem('auth', 'true');
        this.status$.next(status);
      })
    );
  }

  logout() {
    this.status$.next(false);
    this.storage.removeItem('auth');
  }

  isLoggedIn() {
    return this.status$.value;
  }
}
