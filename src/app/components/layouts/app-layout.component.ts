import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { FooterComponent } from "../footer.component";
import { HeaderComponent } from "../header.component";

@Component({
	selector: "app-app-layout",
	standalone: true,
	imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
	template: `
    <app-header></app-header>
    <div class="min-h-screen flex">
      <div class="flex-1">
        <router-outlet></router-outlet>
      </div>
    </div>
    <app-footer></app-footer>
  `,
})
export class AppLayoutComponent {}
