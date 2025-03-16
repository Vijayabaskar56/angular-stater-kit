import { Routes } from '@angular/router';
import { AppShellComponent } from './app-shell/app-shell.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { OTPComponent } from './components/otp/otp.component';
import { AccountComponent } from './components/account/account.component';
import { AuthLayoutComponent } from './components/layouts/auth-layout.component';
import { AppComponent } from './app.component';
import { AppLayoutComponent } from './components/layouts/app-layout.component';

export const routes: Routes = [{ path: 'shell', component: AppShellComponent },
    {
        path : '', component : AppLayoutComponent, children : [
            { path: '', component : AppComponent, pathMatch: 'full' },
        ]
    },
    {
        path : 'auth', component : AuthLayoutComponent, children : [
            { path: 'login', component: LoginComponent },
            { path: 'signup', component: SignupComponent },
            { path: 'forgot-password', component: ForgotPasswordComponent },
            { path: 'otp', component: OTPComponent },
        ]
    },
    { path: 'account', component: AccountComponent },
];
