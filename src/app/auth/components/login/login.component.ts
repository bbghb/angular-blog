import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;
  hasInvalidCredentials = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)])
    });
  }

  login() {
    if (!this.form.valid) return;

    this.authService.login(this.form.value).subscribe(status => {
      if (status) {
        this.router.navigate(['/']);
      } else {
        this.hasInvalidCredentials = true;
      }
    });
  }
}
