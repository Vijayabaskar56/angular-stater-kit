import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { injectForm, TanStackField } from '@tanstack/angular-form';
import { signUpSchema } from '../../models/validation.schemas';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink , TanStackField]
})
export class SignupComponent {
  showPassword = false;
  showConfirmPassword = false;
  loading = false;
  
  signUpForm = injectForm({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      userName: '',
      name: '',
    },
    validators: {
      onChange : signUpSchema
    },
    onSubmit: async (values) => {
      this.loading = true
      try {
        await this.authService.authClient.signUp.email({
          email : values.value.email,
          password : values.value.password,
          name : values.value.name,
          username : values.value.userName,
        });
        this.router.navigate(['/login']);
      } catch (error) {
        // Handle error
      } finally {
        this.loading = false;
      }
    },
  });

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  async signupWithGoogle() {
    try {
      await this.authService.authClient.signIn.social({
        provider: 'google',
        callbackURL: '/account'
      });
      this.router.navigate(['/account']);
    } catch (err) {
    }
  }
}