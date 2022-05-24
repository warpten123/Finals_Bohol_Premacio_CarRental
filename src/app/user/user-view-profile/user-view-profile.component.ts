import { UserViewRequestComponent } from './../user-view-request/user-view-request.component';
import { HotToastService } from '@ngneat/hot-toast';
import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { CarsService } from 'src/app/services/cars/cars.service';
import { UsersService } from 'src/app/services/users/users.service';
import { CarsInterface } from 'src/app/services/cars/cars-interface';
import { UsersInterface } from 'src/app/services/users/user-interface';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-view-profile',
  templateUrl: './user-view-profile.component.html',
  styleUrls: ['./user-view-profile.component.css']
})
export class UserViewProfileComponent implements OnInit {
  
  isWallet: boolean = false;
  user$: any;
  cars: CarsInterface[]=[];
  temp_User: UsersInterface[]=[];
  curr_User!: UsersInterface;
  email!: string;
  count: number = 0;
  found: boolean = false;
  

  
  constructor(
    private afs: AuthenticationService,
    private crudCar: CarsService,
    private crudUser: UsersService,
    private toast: HotToastService,
    private router: Router,
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
        this.found = true;
        }else
          this.count++;
        console.log(this.count)
    }
     
    })
  }

  updateUserForm: FormGroup = new FormGroup({
    $key: new FormControl(['']),
    updateUsername: new FormControl('', Validators.required),
    updateAge: new FormControl('', [
      Validators.required,
      Validators.min(18),
      Validators.max(65)
    ]),
    updateEmail: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    updatePassword: new FormControl('', [
      Validators.required,
    ]),
    updateMoney: new FormControl(['']),
  });


onSubmitUpdate(key: string){
  if(!this.updateUserForm.valid && this.isWallet == false){
    this.toast.error("Complete All Fields");
    return;
  }
  if(!this.updateUserForm.valid && this.isWallet == true){
    this.toast.success("Wallet Updated!");
    this.curr_User.money = this.curr_User.money + this.updateUserForm.value.updateMoney;
    this.crudUser.modifyUsers(key,this.curr_User);
    return;
  }
 
  const payload: UsersInterface = {
    $key: '',
    name: this.updateUserForm.value.updateUsername,
    email: this.updateUserForm.value.updateEmail,
    age: this.updateUserForm.value.updateAge,
    password: this.updateUserForm.value.updatePassword,
    money: this.curr_User.money,
  };
  this.afs.delete();
  this.afs.register(payload.email,payload.password).pipe(
    this.toast.observe({
      success: 'Update Successfully!',
      loading: 'Processing',
      error: (message) => `${message}`
    })
  ).subscribe(()=>{
    this.router.navigate(['/user-dashboard']);
  });
    this.crudUser.modifyUsers(key,payload);
   
  

}

validateMoney(){
  this.isWallet = true;
}

  
}
