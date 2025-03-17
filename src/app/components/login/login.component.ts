import { CommonModule } from "@angular/common";
import { Component, inject, signal } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { TanStackField, injectForm, injectStore } from "@tanstack/angular-form";
import { toast } from "ngx-sonner";
import { loginSchema } from "../../models/validation.schemas";
import { AuthService } from "../../services/auth.service";

@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	standalone: true,
	imports: [CommonModule, RouterLink, TanStackField],
})
export class LoginComponent {
	error = "";
	showPassword = false;
	loading = signal<boolean>(false);
	logInForm = injectForm({
		defaultValues: {
			email: "",
			password: "",
			rememberMe: false,
		},
		validators: {
			onChange: loginSchema,
		},
		onSubmit: async (values) => {
			await this.authService.authClient.signIn.email(
				{
					email: values.value.email,
					password: values.value.password,
					rememberMe: values.value.rememberMe,
				},
				{
					onRequest: () => {
						this.loading.set(true);
					},
					onSuccess: (ctx) => {
						console.log(ctx);
						this.loading.set(false);
						this.router.navigate(["/account"]);
					},
					onError: (ctx) => {
						this.loading.set(false);
						toast.error(ctx.error.message);
					},
				},
			);
		},
	});
	canSubmit = injectStore(this.logInForm, (state) => state.canSubmit);
	isSubmitting = injectStore(this.logInForm, (state) => state.isSubmitting);
	authService = inject(AuthService);
	router = inject(Router);

	togglePassword() {
		this.showPassword = !this.showPassword;
	}

	async loginWithGoogle() {
		try {
			await this.authService.authClient.signIn.social(
				{
					provider: "google",
					callbackURL: "http://localhost:4200/account",
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
				},
			);
			// this.router.navigate(["/account"]);
		} catch (err) {
			toast.error("Google login failed");
		}
	}
}
