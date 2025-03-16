import { Component } from '@angular/core';
import { LoadingService } from './services/loading.service';
import { RouterOutlet } from '@angular/router';
@Component({
 selector: 'app-root',
 imports: [RouterOutlet],
 templateUrl: './app.component.html',
 styleUrl: './app.component.css',
})
export class AppComponent {
 title = 'angular-starter-kit';
 constructor(private loadingService: LoadingService) {

 }
}
