import { HotToastModule, HotToastService } from '@ngneat/hot-toast';
import { RequestRentalService } from './../../services/request-rental/request-rental.service';
import { CarsService } from './../../services/cars/cars.service';
import { RequestRental } from 'src/app/services/request-rental/request-rental-interface';
import { CarsInterface } from 'src/app/services/cars/cars-interface';
import { UsersService } from './../../services/users/users.service';
import { Component, OnInit } from '@angular/core';
import { UsersInterface } from 'src/app/services/users/user-interface';
import { Subject } from 'rxjs';
import * as moment from 'moment';
@Component({
  selector: 'app-view-history',
  templateUrl: './view-history.component.html',
  styleUrls: ['./view-history.component.css']
})
export class ViewHistoryComponent implements OnInit {
  users!: UsersInterface;
  passUserData!: Subject<UsersInterface>;
  cars: CarsInterface[]=[];
  passCarData!: Subject<CarsInterface[]>;
  rents: RequestRental[]=[];
  passRentData!: Subject<RequestRental[]>;
  days: any []=[];
  cont: boolean = false;


  constructor(
    private crudUser: UsersService,
    private crudRental: RequestRentalService,
    private crudCars: CarsService,
    private toast: HotToastService,
  ) { 
    this.passUserData = this.crudUser.passUserValues$;
    this.passUserData.subscribe((users: UsersInterface)=>{
      this.users = users;
    })
    this.passRentData = this.crudRental.passRentalValues$;
    this.passRentData.subscribe((rents: RequestRental[])=>{
      for(let i = 0;i < rents.length; i++){
        if(rents[i].requestStatus != "Pending"){
          const currDay = moment();
          const rentalDate = moment(rents[i].requestDate);
          const diff = rentalDate.diff(currDay,'days');
          this.days.push(diff);
          this.rents.push(rents[i]);
        }
      }
    })
    this.passCarData = this.crudCars.passCarsValuesArray$;
    this.passCarData.subscribe((cars: CarsInterface[])=>{
      this.cars = cars;
      // console.log("cars:",this.cars);
    })

  }

  ngOnInit(): void {
  }
  cancelRequest(rent: RequestRental,cars: CarsInterface){
    if(!this.checkDateForCancel(rent)){
      this.toast.error("You can't cancel this rental anymore")
      return;
    }
    rent.requestStatus = "Cancelled by User"
    this.crudRental.editRequest(rent.$key,rent);
    cars.carStatus = "Available"
    this.crudCars.modifyCars(cars.$carKey,cars);
    this.users.money = this.users.money + cars.carRentPrice;
    this.crudUser.modifyUsers(this.users.$key,this.users);
    this.toast.success("Cancelled Sucessfully. Wallet Updated");
  
  }
  checkDateForCancel(rent: RequestRental){
    const currentDay = moment();
    const rentalDate = moment(rent.requestDate);
    const diff = rentalDate.diff(currentDay,'days');
      if(diff >= 7)
        return this.cont = true;
      else
        return this.cont = false;
    }

}
