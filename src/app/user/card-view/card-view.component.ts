import { CarsService } from 'src/app/services/cars/cars.service';
import { Component, OnInit } from '@angular/core';
import { CarsInterface } from 'src/app/services/cars/cars-interface';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { UserDashboardComponent } from 'src/app/user/user-dashboard/user-dashboard.component'
import { Subject } from 'rxjs';

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.css']
})
export class CardViewComponent implements OnInit {
  
  cars!: CarsInterface;
  passCardData!: Subject<CarsInterface>;
  constructor(
    private crudCar: CarsService,    
    private dialog: MatDialog,

  ) {
    
    this.passCardData = this.crudCar.passCarsValues$;
    this.passCardData.subscribe((val)=>{
      this.cars = val;
      console.log("really?",this.cars);
    })

   }

  ngOnInit(): void {
    // this.cars = this.fromUserDashboard.passData();
    // console.log(this.cars);
    console.log("xd");
  }
  close(){
    this.dialog.closeAll();
  }

}
