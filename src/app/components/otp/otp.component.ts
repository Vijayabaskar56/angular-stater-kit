import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { injectForm, TanStackField } from '@tanstack/angular-form';
import { z } from 'zod';
import { AuthService } from '../../services/auth.service';

const otpSchema = z.object({
  otp: z.string().length(6, 'Please enter all 6 digits')
});

type OtpForm = z.infer<typeof otpSchema>;

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink , TanStackField],
})
export class OTPComponent {
  loading = false;
  timeLeft = 30;
  timerInterval: any;
  route = inject(ActivatedRoute);
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.startTimer();
    this.route.queryParams.subscribe(params => {
      console.log(params['email']);
    });
  }
  otpForm = injectForm({
    defaultValues: {
      otp: '      '
    },
    validators: {
      onChange :  otpSchema,
    },
    onSubmit: async (values) => {
      this.loading = true;
      try {
        await this.authService.authClient.emailOtp.verifyEmail({
          email : this.route.snapshot.params['email'],
          otp : values.value.otp,
        })
        this.router.navigate(['/account']);
      } catch (error) {
        // Handle error
      } finally {
        this.loading = false;
      }
    },
  });
  ngOnDestroy() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  startTimer() {
    this.timeLeft = 30;
    this.timerInterval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        clearInterval(this.timerInterval);
      }
    }, 1000);
  }

  async resendOTP() {
    try {
      await this.authService.authClient.emailOtp.sendVerificationOtp({
        email : this.route.snapshot.root.params['email'],
        type: 'email-verification',
      });
      this.startTimer();
    } catch (error) {
      // Handle error
    }
  }

  onOtpInput(event: Event, field: any) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/[^0-9]/g, '');
    
    if (value.length > 6) {
      value = value.slice(0, 6);
    }
    
    field.api.setValue(value);

    // Move focus to next input
    const inputs = document.querySelectorAll('input[type="text"]');
    const currentIndex = Array.from(inputs).indexOf(input);
    
    if (value.length === 6) {
      (inputs[5] as HTMLInputElement).focus();
    } else if (currentIndex < 5 && value.length > currentIndex) {
      (inputs[currentIndex + 1] as HTMLInputElement).focus();
    }
  }

  onKeyDown(event: KeyboardEvent, index: number) {
    const input = event.target as HTMLInputElement;
    const inputs = document.querySelectorAll('input[type="text"]');
    
    if (event.key === 'Backspace') {
      if (!input.value && index > 0) {
        (inputs[index - 1] as HTMLInputElement).focus();
      }
    } else if (event.key === 'ArrowLeft' && index > 0) {
      event.preventDefault();
      (inputs[index - 1] as HTMLInputElement).focus();
    } else if (event.key === 'ArrowRight' && index < 5) {
      event.preventDefault();
      (inputs[index + 1] as HTMLInputElement).focus();
    }
  }

  onPaste(event: ClipboardEvent, field: any) {
    event.preventDefault();
    const pastedData = event.clipboardData?.getData('text');
    if (!pastedData) return;

    const numbers = pastedData.match(/\d/g);
    if (!numbers) return;

    const otp = numbers.slice(0, 6).join('');
    field.api.setValue(otp);
  }
}