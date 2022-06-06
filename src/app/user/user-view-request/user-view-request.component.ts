import { HotToastService } from '@ngneat/hot-toast';
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
import { Subject } from 'rxjs';
import * as moment from 'moment';
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
    private toast: HotToastService,
    ) { 
    }
  userData!: any;
  user$: any;
  email!: string;

  cont: boolean = false;
  temp_User: UsersInterface[] = [];
  curr_User!: UsersInterface;
  final_Users!: UsersInterface;


  temp_Cars: CarsInterface[] = [];
  curr_Cars: CarsInterface[] = [];
  final_Cars: CarsInterface[] = [];
  
  rentals: RequestRental[] = [];
  finalRentals: RequestRental[] = [];


  count: number = 0;
  found: boolean = false;
  
  
  ngOnInit(): void {
   this.populateData();
  }//end ngoninit
  populateData(){
    this.rentals.length=0;
    this.finalRentals.length = 0;
    this.final_Cars.length = 0;

    this.afs.currentUser$.subscribe((user: any)=>{
      this.user$ = user;
     this.email = this.user$.email;
    })
    this.crudUser.getUsers().subscribe((user: UsersInterface[])=> {
      this.temp_User = user;
    while(!this.found){
      if(this.temp_User[this.count].email == this.email){
        this.curr_User = this.temp_User[this.count];
        this.found = true;
        }else
          this.count++;
    }
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
              this.curr_Cars[i] = this.temp_Cars[j];
            }
          }
        }
        this.final_Users = this.curr_User;
        this.final_Cars = this.curr_Cars;
        console.log("FINAL CARS: ",this.final_Cars);
        console.log("FINAL RENTALS: ",this.finalRentals);
      })
    })
  }
  onDelete(rents: RequestRental,index: number,cars: CarsInterface){
    // if(!this.checkDateForCancel(rents)){
    //   this.toast.error("You can't cancel this rental anymore")
    //   return;
    // }
    // cars.carStatus = "Available";
    // this.crudCar.modifyCars(cars.$carKey,cars);
    // this.final_Users.rentedVehicles.splice(index,1);
    // this.finalRentals.splice(index,1);
    // this.crudUser.modifyUsers(this.final_Users.$key,this.final_Users);
    // this.crudRents.deleteRequest(rents.$key);
    // this.populateData();
    // this.toast.success(rents.$key + " cancelled successfully!");
  }
 
}
