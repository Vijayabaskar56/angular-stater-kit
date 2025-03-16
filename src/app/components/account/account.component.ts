import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";
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
		this.authService.authClient.signOut();
		this.router.navigate(["/login"]);
	}
}
