import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SaloonEmployeesComponent } from './saloon-employees/saloon-employees.component';
import { TestCComponent } from './test-c/test-c.component';
import { combineLatest } from 'rxjs';
import { AuthComponent } from './Auth/Auth.component';
import { LoaderComponent } from './loader/loader.component';
import { SaloonNavComponent } from './saloon-nav/saloon-nav.component';

const routes: Routes = [
  {path:'' , component:SaloonEmployeesComponent},
  {path:'test', component:TestCComponent},
  {path:'saloonEmployees',component:SaloonEmployeesComponent},
  {path:'auth' , component:AuthComponent},
  {path:'loader',component:LoaderComponent},
  {path:'saloonNav',component:SaloonNavComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
