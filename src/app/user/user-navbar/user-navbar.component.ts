import { Router } from '@angular/router';
import { UsersService } from './../../services/users/users.service';
import { UsersInterface } from './../../services/users/user-interface';
import { CarsInterface } from 'src/app/services/cars/cars-interface';
import { CarsService } from './../../services/cars/cars.service';
import { AuthenticationService } from './../../services/authentication/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.css']
})
export class UserNavbarComponent implements OnInit {
  
 
  constructor(
    private authService: AuthenticationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
   
  }
  
  logout(){
    this.authService.logout().subscribe(()=>{
      this.router.navigate(['/login']);
    })
    }
}
