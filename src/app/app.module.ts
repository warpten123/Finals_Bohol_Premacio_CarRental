import { AuthenticationService } from './services/authentication/authentication.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';

import { AngularFireAuthModule, PERSISTENCE } from '@angular/fire/compat/auth';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './screens/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { HotToastModule } from '@ngneat/hot-toast';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminNavbarComponent } from './admin/admin-navbar/admin-navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminAddComponent } from './admin/admin-add/admin-add.component';
import { AdminAvailableComponent } from './admin/admin-available/admin-available.component';
import { AdminRentedComponent } from './admin/admin-rented/admin-rented.component';
import { ViewHistoryComponent } from './user/view-history/view-history.component';
import { UserViewRequestComponent } from './user/user-view-request/user-view-request.component';
import { UserViewProfileComponent } from './user/user-view-profile/user-view-profile.component';
import { MatCardModule} from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UserNavbarComponent } from './user/user-navbar/user-navbar.component';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { AdminEditComponent } from './admin/admin-edit/admin-edit.component';
import { CardViewComponent } from './user/card-view/card-view.component';
import { MatNativeDateModule } from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { Auth} from '@angular/fire/auth';
//
//

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminLoginComponent,
    UserDashboardComponent,
    AdminDashboardComponent,
    AdminNavbarComponent,
    AdminAddComponent,
    AdminAvailableComponent,
    AdminRentedComponent,
    ViewHistoryComponent,
    UserViewRequestComponent,
    UserViewProfileComponent,
    UserNavbarComponent,
    AdminEditComponent,
    CardViewComponent,
    
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    HotToastModule.forRoot(),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    FlexLayoutModule,
    MatIconModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    FormsModule,
  ],
  providers: [/*ApiService*/ { provide: PERSISTENCE, useValue: 'session' }],
  bootstrap: [AppComponent]
})
export class AppModule { }