import { CardViewComponent } from './../card-view/card-view.component';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { RequestRental } from './../../services/request-rental/request-rental-interface';
import { RequestRentalService } from './../../services/request-rental/request-rental.service';
import { UsersService } from 'src/app/services/users/users.service';
import { CarsInterface } from './../../services/cars/cars-interface';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarsService } from 'src/app/services/cars/cars.service';
import { UsersInterface } from 'src/app/services/users/user-interface';
import { AdminEditComponent } from 'src/app/admin/admin-edit/admin-edit.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
  // user$ = this.authService.currentUser$;
  cars: CarsInterface[]=[];
  check!: UsersInterface;
  user$: any;
  temp_User!: UsersInterface[];
  curr_User!: UsersInterface;
  rents!: RequestRental[];
  email!: string;
  count: number = 0;
  found: boolean = false;
  foundCar: boolean = false;
  passCarData!: CarsInterface;
  passUserData!: Subject<UsersInterface>;
  
  constructor(private router: Router, 
    private crudCar: CarsService,
    private authService: AuthenticationService,
    private crudUser: UsersService,
    private toast: HotToastService,
    private crudRental: RequestRentalService,
    private dialog: MatDialog,
    ) {
     
     }
  

  ngOnInit(): void {
    
    this.crudCar.getCars().subscribe((val: CarsInterface[]) => {
      this.cars = val;
    });
    this.authService.currentUser$.subscribe((user: any)=>{
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
     console.log(this.curr_User);
    })
    
  }
  
  nav(destination: string) {
  this.router.navigate([destination]);
  }
  submitRequest(car: CarsInterface){
    if( this.curr_User.money < car.carRentPrice){
      this.toast.error("You don't have enough money!");
      return;
    }else if(this.checkCar(car.$carKey)){
      this.toast.error("You already requested this car!");
      return;
    }
    console.log(car.carName);
    var moment = require("moment");
    var current_timestamp = moment().format("ddd MMM D YYYY 00:00:00");
    const payload: RequestRental = {
      $key: '',
      userKey: this.curr_User.$key,
      carKey: car.$carKey,
      requestDate: current_timestamp,
      requestStatus: "Pending",
    }
    this.curr_User.rentedVehicles?.push(payload.carKey);
    this.crudUser.modifyUsers(this.curr_User.$key,this.curr_User);
    this.crudRental.addRequest(payload);
    console.log(this.curr_User);
    this.toast.success("Request Submitted!");
    this.router.navigate(['/user-request']);
  }

  onEdit(cars: CarsInterface){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true;
    dialogConfig.width =  "60%";
    this.dialog.open(CardViewComponent,dialogConfig);
    this.crudCar.getPassCarValue(cars);
    
  }
  checkCar(carKey: String){
    for(let i = 0; i < this.curr_User.rentedVehicles.length; i++){
      if(carKey == this.curr_User.rentedVehicles[i]){
        return this.foundCar = true;
      }
    }


  return this.foundCar = false;
  }
}
