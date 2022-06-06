import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CarsInterface } from '../../services/cars/cars-interface';
import { CarsService } from '../../services/cars/cars.service';
import { HotToastService } from '@ngneat/hot-toast';
@Component({
  selector: 'app-admin-add',
  templateUrl: './admin-add.component.html',
  styleUrls: ['./admin-add.component.css']
})
export class AdminAddComponent implements OnInit {

  constructor(
    private router: Router,
    public crud: CarsService,
    private toast: HotToastService,
    
  ) { }//end constructor

  ngOnInit(): void {
  }

  adminAddForm: FormGroup = new FormGroup({
    carName: new FormControl('', Validators.required),
    carColor: new FormControl('', Validators.required),
    carPrice: new FormControl('', Validators.required),
    carMileage: new FormControl('', Validators.required),
    carImage: new FormControl('', Validators.required),
    carBarangay: new FormControl('', Validators.required),
    carCity: new FormControl('', Validators.required),
    
  });
  

  imagePath: any;
  url: any;
  message: String = "";
  validImage: boolean = false;


  onFileChanged(event) {
    console.log('triggered');
    const files = event.target.files;
    if (files.length === 0)
      return;

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.url = reader.result;
      console.log(this.url);
      this.validImage = true;
    }
  }

  clearImage(){
    this.imagePath = "";
    this.url = "";
    this.validImage = false;
    this.adminAddForm.reset();
  }
  onSubmitAdd() {
    console.log(this.adminAddForm.value.carImage);
    if (!this.adminAddForm.valid) {
      this.toast.error("Please Complete All Fields!");
      return;
    }
    console.log(this.url+"kk");
    const payload: CarsInterface = {
      $carKey: '',
      carName: this.adminAddForm.value.carName,
      carColor: this.adminAddForm.value.carColor,
      carRentPrice: this.adminAddForm.value.carPrice,
      carMileage: this.adminAddForm.value.carMileage,
      carStatus: "Available",
      carImage: this.url,
      carLocation: {
        city: this.adminAddForm.value.carCity,
        barangay: this.adminAddForm.value.carBarangay,
      }
    }
    console.log(payload);
    this.crud.addCars(payload);
    this.toast.success(payload.carName + " added successfully!");
    this.adminAddForm.reset();
    this.router.navigate(['/admin-available']);
  }
}
