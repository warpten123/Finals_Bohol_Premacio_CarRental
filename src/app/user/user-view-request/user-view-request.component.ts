import { CarsInterface } from 'src/app/services/cars/cars-interface';
import { CarsService } from 'src/app/services/cars/cars.service';
import { RequestRental } from './../../services/request-rental/request-rental-interface';
import { RequestRentalService } from './../../services/request-rental/request-rental.service';
import { UserViewProfileComponent } from './../user-view-profile/user-view-profile.component';
import { UsersService } from './../../services/users/users.service';
import { AuthenticationService } from './../../services/authentication/authentication.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UsersInterface } from './../../services/users/user-interface';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-user-view-request',
  templateUrl: './user-view-request.component.html',
  styleUrls: ['./user-view-request.component.css']
})
export class UserViewRequestComponent implements OnInit {
  
  constructor(
    private afs: AuthenticationService,
    private crudUser: UsersService,
    private crudRents: RequestRentalService,
    private crudCar: CarsService,
    ) { }
  userData!: any;
  user$: any;
  email!: string;
  temp_User: UsersInterface[] = [];
  temp_Cars: CarsInterface[] = [];
  curr_Cars: CarsInterface[] = [];
  curr_User!: UsersInterface;
  count: number = 0;
  found: boolean = false;
  rentals: RequestRental[] = [];
  tempKey!: string;
  ngOnInit(): void {
    this.crudRents.getRentalRequests().subscribe((rents: RequestRental[])=>{
      this.rentals = rents;
    })
      this.crudUser.getUsers().subscribe((user: UsersInterface[])=> {
        this.temp_User = user;  
      while(!this.found){
        if(this.temp_User[this.count].$key == this.rentals[this.count].userKey){
          this.curr_User = this.temp_User[this.count];
          this.found = true;
          this.count = 0;
        }else
          this.count++;
      }
      })
      this.found = false;
      //this.getCars(this.found,this.count);


    //  console.log(this.rentals);
  }//end ngoninit
  
  getCars(found: boolean, count: number){
    
    this.crudCar.getCars().subscribe((cars: CarsInterface[])=>{
      count = 0;
      this.temp_Cars = cars; 
        if(this.temp_Cars[count].$carKey == this.rentals[count].carKey){
          this.curr_Cars[count] = this.temp_Cars[count];
          found = true;
          count = 0;
        }else
          count++;
        
    })
  }

}
