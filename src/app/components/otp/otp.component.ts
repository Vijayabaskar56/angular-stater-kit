import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink]
})
export class OTPComponent implements AfterViewInit {
  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef>;
  otpValues: string[] = ['', '', '', '', '', ''];
  error: string = '';
  loading: boolean = false;
  timeLeft: number = 30;
  timerInterval: any;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngAfterViewInit() {
    // Focus first input on component load
    setTimeout(() => {
      this.otpInputs.first?.nativeElement.focus();
    });
    this.startTimer();
  }

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

  onOtpChange(index: number, event: any) {
    const input = event.target;
    let value = input.value;
    
    // Only allow numbers
    value = value.replace(/[^0-9]/g, '');
    
    // Take only the last character if multiple characters are entered
    if (value.length > 1) {
      value = value[value.length - 1];
    }
    
    // Update the value
    this.otpValues[index] = value;
    input.value = value;

    // Move to next input if value is entered
    if (value && index < 5) {
      this.otpInputs.get(index + 1)?.nativeElement.focus();
    }
  }

  onKeyDown(index: number, event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    
    if (event.key === 'Backspace') {
      if (!input.value && index > 0) {
        // Move to previous input on backspace if current input is empty
        this.otpValues[index] = '';
        this.otpInputs.get(index - 1)?.nativeElement.focus();
      } else {
        // Clear current input
        this.otpValues[index] = '';
      }
    } else if (event.key === 'ArrowLeft' && index > 0) {
      event.preventDefault();
      this.otpInputs.get(index - 1)?.nativeElement.focus();
    } else if (event.key === 'ArrowRight' && index < 5) {
      event.preventDefault();
      this.otpInputs.get(index + 1)?.nativeElement.focus();
    }
  }

  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    const pastedData = event.clipboardData?.getData('text');
    if (!pastedData) return;

    const numbers = pastedData.match(/\d/g);
    if (!numbers) return;

    numbers.slice(0, 6).forEach((num, index) => {
      if (index < 6) {
        this.otpValues[index] = num;
        const input = this.otpInputs.get(index)?.nativeElement;
        if (input) {
          input.value = num;
        }
      }
    });

    // Focus the next empty input or the last input if all are filled
    const nextEmptyIndex = this.otpValues.findIndex(val => !val);
    if (nextEmptyIndex !== -1) {
      this.otpInputs.get(nextEmptyIndex)?.nativeElement.focus();
    } else {
      this.otpInputs.get(5)?.nativeElement.focus();
    }
  }

  async resendOTP() {
    try {
      await this.authService.authClient.forgetPassword({
        email : 'vj'
      });
      this.startTimer();
    } catch (err) {
      this.error = 'Failed to resend OTP';
    }
  }

  async onSubmit() {
    const otp = this.otpValues.join('');
    if (otp.length !== 6) {
      this.error = 'Please enter all digits';
      return;
    }

    this.loading = true;
    this.error = '';

    try {
      await this.authService.authClient.emailOtp.verifyEmail({
        email : 'vj',
        otp: otp,
      });
      this.router.navigate(['/account']);
    } catch (err) {
      this.error = 'Invalid OTP code';
    } finally {
      this.loading = false;
    }
  }
}