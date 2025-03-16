import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  injectForm,
  injectStore,
  TanStackField
} from '@tanstack/angular-form';
import { loginSchema } from '../../models/validation.schemas';
import { AuthService } from '../../services/auth.service';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink, TanStackField],
})
export class LoginComponent {
  error: string = '';
  showPassword: boolean = false;
  loading = signal<boolean>(false);
  logInForm = injectForm({
    defaultValues: {
      email: '',
      password: '',
    },
    validators: {
      onChange: loginSchema,
    },
    onSubmit: async (values) => {
      this.loading.set(true);
      this.error = '';

      try {
        await this.authService.authClient.signIn.email(
          {
            email: values.value.email,
            password: values.value.password,
          },
          {
            onRequest: () => {
              this.loading.set(true);
            },
            onSuccess: () => {
              this.loading.set(false);
              this.router.navigate(['/account']);
            },
            onError: () => {
              this.loading.set(false);
            },
          }
        );
      } catch (err) {
        this.error = 'Invalid email or password';
      } finally {
        this.loading.set(false);
      }
    },
  });
  canSubmit = injectStore(this.logInForm, (state) => state.canSubmit);
  isSubmitting = injectStore(this.logInForm, (state) => state.isSubmitting);

  constructor(private authService: AuthService, private router: Router) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  async loginWithGoogle() {
    try {
      await this.authService.authClient.signIn.social(
        {
          provider: 'google',
          callbackURL: '/account',
        },
        {
          onRequest: () => {
            this.loading.set(true);
          },
          onSuccess: (ctx) => {
            this.loading.set(false);
            window.location.href = ctx.data.url;
          },
          onError: (ctx) => {
            this.loading.set(false);
            toast.error(ctx.error.message);
          },
        }
      );
      this.router.navigate(['/account']);
    } catch (err) {
      toast.error('Google login failed');
    }
  }
}
