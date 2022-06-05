import { HotToastService } from '@ngneat/hot-toast';
import { CarsInterface } from 'src/app/services/cars/cars-interface';
import { Component, OnInit } from '@angular/core';
import { CarsService } from 'src/app/services/cars/cars.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-edit.component.html',
  styleUrls: ['./admin-edit.component.css']
})
export class AdminEditComponent implements OnInit {
cars!: CarsInterface[];
imagePath: any;
url: any;
message: String = "";
validImage: boolean = false;
  constructor(
    public crud: CarsService,
    private dialog: MatDialog,
    private toast: HotToastService,
  ) { }
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
  ngOnInit(): void {
    this.url = this.crud.editCarForm.value.carImage;
    console.log(this.url);
  }
  onSubmitUpdate(){
    this.crud.editCarForm.value.carImage = this.url;
    this.crud.modifyCars(this.crud.editCarForm.value.$carKey,this.crud.editCarForm.value);
    this.dialog.closeAll();
    this.toast.success("Successfully Updated!");
  }
  closeDialog(){
    this.dialog.closeAll();
    this.crud.editCarForm.reset();
  }
  clearImage(){
    this.imagePath = "";
    this.url = "";
    this.validImage = false;
    this.crud.editCarForm.reset();
  }
}
