import { CarsInterface } from './../../services/cars/cars-interface';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarsService } from 'src/app/services/cars/cars.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
  // user$ = this.authService.currentUser$;
  cars!: CarsInterface[];
  check!: CarsInterface;
  constructor(private router: Router, 
    private crud: CarsService,
    private authService: AuthenticationService,
    private toast: HotToastService,
    ) { }
  

  ngOnInit(): void {
    this.crud.getCars().subscribe((val) => {
      this.cars = val;
    });
    
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
