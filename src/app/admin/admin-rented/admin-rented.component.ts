import { CarsInterface } from './../../services/cars/cars-interface';
import { UsersInterface } from './../../services/users/user-interface';
import { RequestRental } from './../../services/request-rental/request-rental-interface';
import { UsersService } from 'src/app/services/users/users.service';
import { RequestRentalService } from './../../services/request-rental/request-rental.service';
import { CarsService } from './../../services/cars/cars.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-rented',
  templateUrl: './admin-rented.component.html',
  styleUrls: ['./admin-rented.component.css']
})
export class AdminRentedComponent implements OnInit {
  rentals: RequestRental[]=[];
  users: UsersInterface[]=[];
  final_Users: UsersInterface[]=[];
  cars: CarsInterface[]=[];
  final_Cars: CarsInterface[]=[];
  constructor(
    private crudCars: CarsService,
    private crudRentals: RequestRentalService,
    private crudUsers: UsersService,
  ) { }

  ngOnInit(): void {
    this.crudRentals.getRentalRequests().subscribe((rents: RequestRental[])=>{
      this.rentals = rents;
    })
    this.crudUsers.getUsers().subscribe((users: UsersInterface[])=>{
      this.users = users;
      for(let i = 0; i < this.rentals.length; i++){
        for(let j = 0; j < this.users.length; j++){
          if(this.rentals[i].userKey == this.users[j].$key){
            this.final_Users[i] = this.users[j];
          }
        }
      }
    })
    this.crudCars.getCars().subscribe((cars: CarsInterface[])=>{
      this.cars = cars;
      for(let i = 0; i < this.rentals.length; i++){
        for(let j = 0; j < this.cars.length; j++){
          if(this.cars[j].$carKey == this.rentals[i].carKey){
            this.final_Cars[i] = this.cars[j];
          }
        }
      }
    })


  }//end ngoninit
  rentAccept(rents: RequestRental){
    rents.requestStatus = "Accepted";
    this.crudRentals.editRequest(rents.$key,rents);
    console.log(rents);
  }
  rentDeny(rents: RequestRental){
    rents.requestStatus = "Denied";
    this.crudRentals.editRequest(rents.$key,rents);
  }
}
