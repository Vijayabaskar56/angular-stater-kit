import { Component, inject } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { NgxSonnerToaster } from "ngx-sonner";
import { LoadingService } from "./services/loading.service";
@Component({
	selector: "app-root",
	imports: [RouterOutlet, NgxSonnerToaster],
	templateUrl: "./app.component.html",
	styleUrl: "./app.component.css",
})
export class AppComponent {
	title = "angular-starter-kit";
	loadinService = inject(LoadingService);
}
