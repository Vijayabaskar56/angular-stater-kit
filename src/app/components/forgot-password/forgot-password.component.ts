import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { injectForm, TanStackField } from '@tanstack/angular-form';
import { toast } from 'ngx-sonner';
import { forgotPasswordSchema } from '../../models/validation.schemas';
import { AuthService } from '../../services/auth.service';

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
      await this.authService.authClient.forgetPassword(
        {
         email: values.value.email,
         redirectTo: 'http://localhost:5173/reset-password',
        },
        {
         // onSuccess: () => {
         //  toast.success('Kindly, check your inbox for password reset link');
         // },
         onError: (ctx) => {
          toast.error(ctx.error.message);
         },
        },
       );
    },
  });

}