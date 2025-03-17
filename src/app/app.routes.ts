import type { Routes } from "@angular/router";
import { AppShellComponent } from "./app-shell/app-shell.component";
import { AppComponent } from "./app.component";
import { AccountComponent } from "./components/account/account.component";
import { ForgotPasswordComponent } from "./components/forgot-password/forgot-password.component";
import { AppLayoutComponent } from "./components/layouts/app-layout.component";
import { AuthLayoutComponent } from "./components/layouts/auth-layout.component";
import { LoginComponent } from "./components/login/login.component";
import { OTPComponent } from "./components/otp/otp.component";
import { SignupComponent } from "./components/signup/signup.component";

export const routes: Routes = [
	{ path: "shell", component: AppShellComponent },
	{
		path: "",
		component: AppLayoutComponent,
		children: [{ path: "", component: AppComponent, pathMatch: "full" }, { path: "account", component: AccountComponent }],
	},
	{
		path: "auth",
		component: AuthLayoutComponent,
		children: [
			{ path: "login", component: LoginComponent },
			{ path: "signup", component: SignupComponent },
			{ path: "forgot-password", component: ForgotPasswordComponent },
			{ path: "otp", component: OTPComponent },
		],
	},
];
