import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { injectForm, TanStackField } from '@tanstack/angular-form';
import { forgotPasswordSchema } from '../../models/validation.schemas';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule , TanStackField]
})
export class ForgotPasswordComponent {
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  forgotPasswordForm = injectForm({
    defaultValues: {
      email: '',
    },
    validators: {
      onChange : forgotPasswordSchema
    },
    onSubmit: async (values) => {      
      try {
        await this.authService.authClient.forgetPassword({
          email : values.value.email
        });
      } catch (error) {
        // Handle error
      } finally {
      }
    },
  });

}