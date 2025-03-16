import { Injectable } from '@angular/core';
import {
  customSessionClient,
  emailOTPClient,
  passkeyClient,
  phoneNumberClient,
  twoFactorClient,
  usernameClient,
} from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/client';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authClient = createAuthClient({
    baseURL: 'http://localhost:3000',
    fetchOptions: {
      credentials: 'include',
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
