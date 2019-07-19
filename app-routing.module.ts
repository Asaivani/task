import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SuccessComponent} from './success/success.component';
import { LoginComponent } from './login/login.component';
import { RegformComponent } from './regform/regform.component';
import { SignupComponent} from './signup/signup.component';
import { DataComponent } from './data/data.component';
import { EditformComponent } from './editform/editform.component';
import {EmpdetailsComponent} from './empdetails/empdetails.component';
import {CryptComponent} from './crypt/crypt.component';
//import { DatebootComponent } from './dateboot/dateboot.component';
import { DatepickerComponent } from './datepicker/datepicker.component';




const routes: Routes = [
   { path: 'success', component:SuccessComponent },
   { path:'login', component: LoginComponent },
   { path:'regform',component:RegformComponent },
   { path:'signup',component:SignupComponent },
   { path:'data',component:DataComponent },
   { path:'editform',component:EditformComponent},
   { path:'empdetails',component:EmpdetailsComponent},
   { path:'crypt',component:CryptComponent },
   //{ path:'dateboot',component:DatebootComponent },
   { path:'datepicker',component:DatepickerComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }