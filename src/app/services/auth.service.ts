import { Injectable } from "@angular/core";
import { createAuthClient } from "better-auth/client";
import {
	customSessionClient,
	emailOTPClient,
	passkeyClient,
	phoneNumberClient,
	twoFactorClient,
	usernameClient,
} from "better-auth/client/plugins";

@Injectable({
	providedIn: "root",
})
export class AuthService {
	authClient = createAuthClient({
		baseURL: "http://localhost:3000",
		fetchOptions: {
			credentials: "include",
		},
		disableDefaultFetchPlugins: true,
		plugins: [
			customSessionClient(),
			emailOTPClient(),
			twoFactorClient(),
			usernameClient(),
			passkeyClient(),
			phoneNumberClient(),
		],
	});
}
