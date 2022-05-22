import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  user$ = this.authService.currentUser$;
  constructor(public authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }
logout(){
  this.authService.logout().subscribe(()=>{
    this.nav('login');
  })
}
nav(destination: string) {
  this.router.navigate([destination]);
}
}
