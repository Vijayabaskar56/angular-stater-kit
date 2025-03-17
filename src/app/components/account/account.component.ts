import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";
import { toast } from "ngx-sonner";
import { AuthService } from "../../services/auth.service";

@Component({
	selector: "app-account",
	templateUrl: "./account.component.html",
	standalone: true,
	imports: [CommonModule],
})
export class AccountComponent {
	authService = inject(AuthService);
	router = inject(Router);

	logout() {
		this.authService.authClient.signOut(
			{},
			{
				onSuccess: (ctx) => {
					console.log(ctx);
					this.router.navigate(["/auth/login"]);
				},
				onError: (ctx) => {
					toast.error(ctx.error.message);
				},
			},
		);
	}
}
