import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AuthTokenService} from './auth-token.service'
import { MatButtonModule
  ,MatCheckboxModule
  ,MatSelectModule
  ,MatIconModule
  ,MatNativeDateModule
  ,MatInputModule
  ,MatTableModule
  ,MatFormFieldControl
  , MatCardModule
  , MatMenuModule
  , MatToolbarModule
  ,MatDialogModule
  ,MatProgressSpinnerModule
  , MatSidenavModule
  , MatListModule
  , MatDatepickerModule
  ,MatProgressBarModule
  ,MatPaginatorModule
  } from '@angular/material';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatExpansionModule} from '@angular/material/expansion';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SaloonEmployeesComponent } from './saloon-employees/saloon-employees.component';
import { TestCComponent } from './test-c/test-c.component';
import { AuthComponent } from './Auth/Auth.component';
import { SaloonNavComponent } from './saloon-nav/saloon-nav.component';
import {LoaderComponent} from './loader/loader.component'
import { LayoutModule } from '@angular/cdk/layout';
import {HttpClientModule} from '@angular/common/http';
import { DialogComponent } from './dialog/dialog.component';



@NgModule({
  declarations: [
    AppComponent,
    SaloonEmployeesComponent,
    TestCComponent,
    AuthComponent,
    SaloonNavComponent,
    LoaderComponent,
    DialogComponent
  ],
  entryComponents: [
    DialogComponent
  ],
  imports: [
    BrowserModule
    ,FormsModule      
    ,AppRoutingModule
    ,BrowserAnimationsModule
    ,MatButtonModule
    ,MatCheckboxModule
    ,MatFormFieldModule //MatFormField is required with MatInputField
    ,MatInputModule     
    ,MatSelectModule
    ,MatRadioModule
    ,MatExpansionModule
    ,MatIconModule
    ,MatDatepickerModule
    ,MatNativeDateModule 
    ,MatCardModule
    ,MatDialogModule
    ,MatInputModule
    ,MatTableModule
    ,MatToolbarModule
    ,MatMenuModule
    ,MatIconModule
    ,MatProgressSpinnerModule
    ,LayoutModule
    ,MatSidenavModule
    ,MatListModule
    ,HttpClientModule
    ,MatTabsModule
    ,MatProgressBarModule
    ,MatPaginatorModule
  ],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent],
 exports:[]
})
export class AppModule { }




