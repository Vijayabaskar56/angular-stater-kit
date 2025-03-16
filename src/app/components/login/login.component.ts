import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { injectForm, TanStackField } from '@tanstack/angular-form';
import { loginSchema } from '../../models/validation.schemas';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink, TanStackField]
})
export class LoginComponent {
  error: string = '';
  loading: boolean = false;
  showPassword: boolean = false;

  logInForm = injectForm({
    defaultValues: {
      email: '',
      password: '',
    },
    validators: {
      onChange : loginSchema
    },
    onSubmit: async (values) => {
      this.loading = true;
      this.error = '';

      try {
        // await this.authService.authClient.signIn
        this.router.navigate(['/account']);
      } catch (err) {
        this.error = 'Invalid email or password';
      } finally {
        this.loading = false;
      }
    }
  });

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  async loginWithGoogle() {
    try {
      // await this.authService.authClient.();
      this.router.navigate(['/account']);
    } catch (err) {
      this.error = 'Google login failed';
    }
  }
}