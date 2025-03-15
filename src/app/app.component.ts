import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TanStackField, injectForm } from '@tanstack/angular-form';
import type { LoadingService } from './services/loading.service';
@Component({
 selector: 'app-root',
 imports: [RouterOutlet, TanStackField],
 templateUrl: './app.component.html',
 styleUrl: './app.component.css',
})
export class AppComponent {
 title = 'angular-starter-kit';
 constructor(private loadingService: LoadingService) {

 }
}
