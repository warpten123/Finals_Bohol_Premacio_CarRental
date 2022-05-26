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

@Component({
  selector: 'app-user-view-request',
  templateUrl: './user-view-request.component.html',
  styleUrls: ['./user-view-request.component.css']
})
export class UserViewRequestComponent implements OnInit {
  
  constructor(
    private crudUser: UsersService,
    private crudRents: RequestRentalService,
    private crudCar: CarsService,
    private toast: HotToastService,
    ) { }
  userData!: any;
  user$: any;
  email!: string;
  temp_User: UsersInterface[] = [];
  temp_Cars: CarsInterface[] = [];
  curr_Cars: CarsInterface[] = [];
  final_Cars: CarsInterface[]=[];
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
        this.crudCar.getCars().subscribe((cars: CarsInterface[])=>{
          this.temp_Cars = cars; 
          for(let i = 0; i < this.rentals.length; i++){
            for(let j = 0; j < this.temp_Cars.length; j++){
              if(this.rentals[i].carKey == this.temp_Cars[j].$carKey){
                this.curr_Cars[i] = this.temp_Cars[j];
                break;
              }
            }
          }
          this.final_Cars = this.curr_Cars
          console.log(this.final_Cars);
        })
        
      


    //  console.log(this.rentals);
  }//end ngoninit
  
  onDelete(rents: RequestRental){
    
    this.rentals.forEach((element,index) => {
      if(element.$key == rents.$key){
        this.rentals.splice(index,1);
      }
    });
    this.final_Cars.forEach((element,index) => {
      if(element.$carKey == rents.carKey){
        this.final_Cars.splice(index,1);
      }
    });
    this.crudRents.deleteRequest(rents.$key);
    console.log(rents);
    this.toast.success(rents.$key + " cancelled successfully!");
  }

}
