import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SuccessComponent } from './success/success.component';
import { RegformComponent } from './regform/regform.component';
import { SignupComponent } from './signup/signup.component';
import { DataComponent } from './data/data.component';
import { EditformComponent } from './editform/editform.component';
import { MyDatePickerModule } from 'mydatepicker';
import { MyDateRangePickerModule } from 'mydaterangepicker';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {AccordionModule} from 'primeng/accordion'; 
import {MenuItem} from 'primeng/api';
import {CalendarModule} from 'primeng/calendar';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmpdetailsComponent } from './empdetails/empdetails.component';
import { CryptComponent } from './crypt/crypt.component';
//import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
//import { DatebootComponent } from './dateboot/dateboot.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { CalendarComponent } from './calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AddformComponent } from './addform/addform.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AddtempComponent } from './addtemp/addtemp.component'; 









@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SuccessComponent,
    RegformComponent,
    SignupComponent,
    DataComponent,
    EditformComponent,
    EmpdetailsComponent,
    CryptComponent,
    //DatebootComponent,
    DatepickerComponent,
    CalendarComponent,
    AddformComponent,
    NavbarComponent,
    AddtempComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MyDatePickerModule,
    MyDateRangePickerModule,
    NgMultiSelectDropDownModule.forRoot(),
    AccordionModule,
    CalendarModule,
    //BrowserAnimationsModule,
    //BsDatepickerModule.forRoot(),
    FullCalendarModule



    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }