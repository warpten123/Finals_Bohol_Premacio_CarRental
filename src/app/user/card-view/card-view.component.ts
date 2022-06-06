import { RequestRentalService } from './../../services/request-rental/request-rental.service';
import { UsersService } from './../../services/users/users.service';
import { UsersInterface } from './../../services/users/user-interface';
import { CarsService } from 'src/app/services/cars/cars.service';
import { Component, OnInit } from '@angular/core';
import { CarsInterface } from 'src/app/services/cars/cars-interface';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { UserDashboardComponent } from 'src/app/user/user-dashboard/user-dashboard.component'
import { Subject } from 'rxjs';
import * as moment from 'moment';
import { HotToastService } from '@ngneat/hot-toast';
import { Router } from '@angular/router';
import { RequestRental } from 'src/app/services/request-rental/request-rental-interface';
@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.css']
})
export class CardViewComponent implements OnInit {
  minDate = new Date();
  maxDate = new Date(2022,12,31);
  getDate =  Date;
  cars!: CarsInterface;
  passCardData!: Subject<CarsInterface>;

  users!: UsersInterface;
  passUserData!: Subject<UsersInterface>;
  constructor(
    private crudCar: CarsService,    
    private crudUser: UsersService,
    private crudRental: RequestRentalService,
    private dialog: MatDialog,
    private toast: HotToastService,
    private router: Router,
  ) {
    this.passCardData = this.crudCar.passCarsValues$;
    this.passCardData.subscribe((cars: CarsInterface)=>{
      this.cars = cars;
    })
    this.passUserData = this.crudUser.passUserValues$;
    this.passUserData.subscribe((users: UsersInterface)=>{
      this.users = users;
    })
   }

  ngOnInit(): void {
    
  }
 
  close(){
    this.dialog.closeAll();
  }
  onSubmitRequest(cars: CarsInterface){
  const rentalDate = moment(this.getDate.toString());
   const payload: RequestRental = {
      $key: '',
      userKey: this.users.$key,
      carKey: cars.$carKey,
      requestDate: rentalDate.toString(),
      requestStatus: "Pending",
    }
    // const currentDate = moment();
    // const newRental = moment(rentalDate);
    // const diff = newRental.diff(currentDate,'days');
    // console.log("DAYS: ",diff)

    this.users.rentedVehicles.push(payload.carKey);
    this.crudUser.modifyUsers(this.users.$key,this.users);
    this.crudRental.addRequest(payload);
    this.toast.success("Request Submitted!");
    this.router.navigate(['/user-request']);
    this.close();
  }


}
