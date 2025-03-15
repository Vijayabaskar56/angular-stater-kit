import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TanStackField, injectForm } from '@tanstack/angular-form';
@Component({
 selector: 'app-root',
 imports: [RouterOutlet, TanStackField],
 templateUrl: './app.component.html',
 styleUrl: './app.component.css',
})
export class AppComponent {
 title = 'angular-starter-kit';
}
