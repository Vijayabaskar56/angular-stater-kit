import {
	type ApplicationConfig,
	provideZoneChangeDetection,
} from "@angular/core";
import { provideRouter } from "@angular/router";

import {
	provideClientHydration,
	withEventReplay,
} from "@angular/platform-browser";
import {
	QueryClient,
	provideTanStackQuery,
	withDevtools,
} from "@tanstack/angular-query-experimental";
import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(routes),
		provideClientHydration(withEventReplay()),
		provideTanStackQuery(
			new QueryClient(),
			withDevtools(() => ({ loadDevtools: "auto" })),
		),
	],
};
