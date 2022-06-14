import { AngularFireAuth } from '@angular/fire/compat/auth';
import { RequestRentalService } from './../../services/request-rental/request-rental.service';
import { Router } from '@angular/router';
import { UsersService } from './../../services/users/users.service';
import { UsersInterface } from './../../services/users/user-interface';
import { CarsInterface } from 'src/app/services/cars/cars-interface';
import { CarsService } from './../../services/cars/cars.service';
import { AuthenticationService } from './../../services/authentication/authentication.service';
import { Component, OnInit } from '@angular/core';
import { RequestRental } from 'src/app/services/request-rental/request-rental-interface';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.css']
})
export class UserNavbarComponent implements OnInit {
  userData!: any;
  user$: any;
  email!: string;

  rentals!: RequestRental[];
  finalRentals: RequestRental[]= [];

  user: UsersInterface[]=[];
  curr_User!: UsersInterface;
  
  temp_Cars!: CarsInterface[];
  curr_Cars: CarsInterface[]=[];

  count: number = 0;
  found: boolean = false;
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private crudRents: RequestRentalService,
    private crudUser: UsersService,
    private crudCar: CarsService,
    private fire: AngularFireAuth,
  ) { }

  ngOnInit(): void {
    this.fire.authState.subscribe((user: any) => {
      this.email = user.email;
    })

    this.crudUser.getUsers().subscribe((user: UsersInterface[])=> {
      this.user = user;
    while(!this.found){
      if(this.user[this.count].email == this.email){
        this.curr_User = this.user[this.count];
        this.found = true;
        }else
          this.count++;
      }
      })
      this.crudRents.getRentalRequests().subscribe((rents: RequestRental[])=>{
        this.rentals = rents;
        for(let i = 0; i < this.rentals.length; i++){
          if(this.rentals[i].userKey == this.curr_User.$key){
            this.finalRentals.push(this.rentals[i]);
          } 
        }
      
      })
      this.crudCar.getCars().subscribe((cars: CarsInterface[])=>{
        this.temp_Cars = cars;
        for(let i = 0; i < this.curr_User.rentedVehicles.length; i++){
          for(let j = 0; j < this.temp_Cars.length; j++){
            if(this.finalRentals[i].carKey == this.temp_Cars[j].$carKey){
              if(this.finalRentals[i].requestStatus !=  "Pending")
                this.curr_Cars.push(this.temp_Cars[j]);
            }
          }
        }
      
        
      })
      
  }//end ngoninit
   
  
  
  logout(){
    this.authService.logout().subscribe(()=>{
      this.router.navigate(['/login']);
    })
    }
  passToHistory(){
    this.crudUser.getPassUserValue(this.curr_User);
    this.crudCar.getPassCarValueArray(this.curr_Cars);
    this.crudRents.getPassRentValue(this.finalRentals);
    
  }
}
