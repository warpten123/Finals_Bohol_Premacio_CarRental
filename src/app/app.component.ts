import { Component } from '@angular/core';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
@Component({
  providers: [{provide: FIREBASE_OPTIONS, useValue: environment.firebase}],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CarRentalBoholPremacio';
}
