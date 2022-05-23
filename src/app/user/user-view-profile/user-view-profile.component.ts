import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { CarsService } from 'src/app/services/cars/cars.service';
import { UsersService } from 'src/app/services/users/users.service';
import { CarsInterface } from 'src/app/services/cars/cars-interface';
import { UsersInterface } from 'src/app/services/users/user-interface';

@Component({
  selector: 'app-user-view-profile',
  templateUrl: './user-view-profile.component.html',
  styleUrls: ['./user-view-profile.component.css']
})
export class UserViewProfileComponent implements OnInit {
  user$: any;
  cars!: CarsInterface[];
  temp_User!: UsersInterface[];
  curr_User!: UsersInterface;
  email!: string;
  count: number = 0;
  found: boolean = false;
  constructor(
    private afs: AuthenticationService,
    private crudCar: CarsService,
    private crudUser: UsersService,

  ) { }

  ngOnInit(): void {
    this.afs.currentUser$.subscribe((user: any)=>{
      this.user$ = user;
     this.email = this.user$.email;
    })
    this.crudUser.getUsers().subscribe((user: UsersInterface[])=> {
      this.temp_User = user;
    while(!this.found){
      if(this.temp_User[this.count].email == this.email){
        this.curr_User = this.temp_User[this.count];
        console.log(this.curr_User);
        this.found = true;
        }else
          this.count++;
        console.log(this.count)
    }
     
    })
  }

}
