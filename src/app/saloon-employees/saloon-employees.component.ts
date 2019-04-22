import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Services/Employee/auth.service';
import { EmployeeCRUDService } from '../Services/Employee/employeeCRUD.service';
import { ProgressBar } from '../Services/shared/progressBar.service'
import { Employee } from '../Services/Employee/Employee'
import 'rxjs/add/operator/toPromise';
import { MatDialog, MatTabChangeEvent, MatPaginator } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { AuthTokenService } from '../auth-token.service';
import { BehaviorSubject } from 'rxjs';
import { FormControl } from '@angular/forms';
import * as $ from 'jquery';
import { tap, isEmpty } from 'rxjs/operators';



@Component({
  selector: 'app-saloon-employees',
  templateUrl: './saloon-employees.component.html',
  styleUrls: ['./saloon-employees.component.css']
})
export class SaloonEmployeesComponent implements OnInit,AfterViewInit{
 
  
  /*Properties*/ 
  PageInfo:any;
  PageInfoArr:string[];
  employee: Employee;
  employees: Employee[];
  employeeSource = new BehaviorSubject(this.employees);
  successMessage: Boolean;
  updateMessage: Boolean;
  errorMessage: Boolean;
  position: string;
  displayedColumns: string[] = ['Id', 'FirstName', 'LastName', 'ContactNumber', 'UserName',  'Actions'];
  dataSource;
  confirmation: Boolean = false;
  selected = new FormControl(0);
  pageNumber:number;
  pageSize:number;
  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  token: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor
    (
      private authService: AuthService
      , private routr: Router
      , private progressBar: ProgressBar
      , private employeeCRUDService: EmployeeCRUDService
      , public dialog: MatDialog
      , private authTokenService: AuthTokenService

    ) { }
  /* Events */
  ngOnInit() {
    this.successMessage = false;
    this.errorMessage = false;
    this.authTokenService.currentToken.subscribe(token => this.token = token)
    this.employee = new Employee();
    this.getAuth();
    
    this.employeeCRUDService.getPaginInfo().subscribe(
      (x) => {this.PageInfo = x; console.log('getPageInfoCalled '+this.PageInfo)
    ;
    this.pageNumber = this.PageInfo.split(',')[0];
    this.pageSize = this.PageInfo.split(',')[1];
    this.dataSource = this.employeeCRUDService.getAllEmployees(this.pageNumber,this.pageSize);
  },null,
      () => {this.PageInfoArr = this.PageInfo.split(',');
     
      this.paginator.pageIndex = <number><unknown> this.PageInfoArr[0];
      this.paginator.pageSize = <number><unknown> this.PageInfoArr[1];    
      this.paginator.length = <number><unknown> this.PageInfoArr[2];    
        if (this.PageInfo != null || this.PageInfo != "" || this.PageInfo != undefined) {

          this.dataSource.paginator = this.paginator;
        }    
      }
    )
   
    
  }
 
  ngAfterViewInit() {
    console.log('ngAfterViewInit()')
    console.log(this.paginator.page)
    console.log(this.paginator.pageIndex)
    this.setCurrentPage(<number><unknown>this.paginator.pageIndex,<number><unknown>this.paginator.pageSize);
    this.paginator.page
      .pipe(
        tap(() => this.dataSource = this.employeeCRUDService.getAllEmployees( <number><unknown>this.paginator.pageIndex,<number><unknown>this.paginator.pageSize))
      )
        .subscribe();
}

  tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
    console.log('tabChangeEvent => ', tabChangeEvent.tab);
    console.log('index => ', tabChangeEvent.index);

  }
  /* Methods */
  getAuth() 
  {
    console.log('Saloon:get Auth Called');
    this.token = localStorage.getItem('Token');
    this.showLoader();
    if (this.token != null || this.token != undefined) {
      this.hideLoader();
      this.routr.navigate(['/saloonEmployees'])
    }
    else {
      this.hideLoader();
      this.routr.navigate(['/auth', { errorMessage: 'Please Login first' }])
    }
  }

  private showLoader(): void 
  {
    console.log('Show Loader Called Called')
    this.progressBar.changeMessage(true);
  }

  private hideLoader(): void 
  {
    console.log('Hide Loader Called')
    this.progressBar.changeMessage(false);
  }

  Reset() 
  {
    this.employee = new Employee();
    $('#AddEditBtn').text('Add')
  }

  Add(element) {
    this.showLoader();
    if(this.isObjectEmpty(this.employee)) {
     this.ErrorMessage();
     this.hideLoader();
     return;
    }
    else
      {
        this.employeeCRUDService.addEditEmployee(this.employee).subscribe
      (
        (result) => {
          this.hideLoader();
          if(result=="Employee Updated"){
            this.UpdateMessage();
          }
          else
          { this.SuccessMessage()}
          this.employee = new Employee()
          this.dataSource = this.employeeCRUDService.getAllEmployees(this.pageNumber,this.pageSize);
        },
        (error) => {
          this.hideLoader(), console.log(error), this.ErrorMessage(),
          setInterval(
            () => { $('.errorMessage').fadeOut(1000), this.errorMessage = false; }
            , 2000
          )
        },
        () => {
          setInterval(
            () => {
              $('.successMessage').fadeOut(2000), this.successMessage = false;
            }
            , 3000
          ),
            console.log('Complete function called')
        }
      )
      }

  }
  ErrorMessage() 
  {
    if (this.errorMessage) {
      this.errorMessage = false;
      $('.errorMessage').show(1000);
       }
    else
    {
        this.errorMessage = true;
        $('.errorMessage').hide();
    }
    $('.errorMessage').hide();
  }
  SuccessMessage() 
  {
    if (!this.successMessage) {
      this.successMessage = true;
      $('.successMessage').show();

    }
    else {
      $('.successMessage').hide();
      this.successMessage = false;
    }

  }
  UpdateMessage()
  {
    if (!this.updateMessage) {
      this.updateMessage = true;
      $('.updateMessage').show();

    }
    else {
      $('.updateMessage').hide();
      this.updateMessage = false;
    }
  }

  openDialog(position): void 
  {
    console.log(position)
    this.position = position;
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '380px',
      //data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result =>{
      console.log('Before ifElse ' + result)
      if (result != undefined || result != null) {
        this.confirmation = result;
        console.log('ifBlock ' + result)
        if (this.confirmation)
          this.DeleteEntry();
      }
      else {
        this.confirmation = false;
        console.log('elseBlock ' + this.confirmation)
      }
    });
  }

  DeleteEntry() 
  {
    this.showLoader();
    this.employeeCRUDService.removeEmployee(<number><unknown>this.position).subscribe((result) => {
      console.log(result);
      this.dataSource = this.employeeCRUDService.getAllEmployees(<number><unknown>this.paginator.pageIndex,<number><unknown>this.paginator.pageSize);
      this.hideLoader();
    },
    (error)=> console.log(error)
    )
  }
  
  DataSource() 
  {
    this.showLoader();
    this.employeeCRUDService.getAllEmployees().subscribe
      (
        (employees: Employee[]) => {
          this.employees = employees;
          console.log('After');
          console.log(this.employees)
          this.hideLoader();
        }, (error) => {
          console.log(error),
          this.hideLoader()
        }
      )
  }
  editEmployee(position) 
  {
    this.showLoader();
    this.employee = new Employee();
    this.employee.Id = <number><unknown>position.Id;
    this.employeeCRUDService.getEmployee(this.employee.Id).subscribe
      (
        (result) => { this.employee = result, console.log(result), this.hideLoader();
          $('#AddEditBtn').text('Update');  
      },

        (error) => { console.log(error), this.hideLoader() }
      )
    console.log('edit Employee Called')
    this.selected.setValue(0);
  }

   isObjectEmpty(Obj) {
    for(var key in Obj) {
    if(Obj.hasOwnProperty(key))
    return false;
    }
    return true;
    }
    //setter
    setCurrentPage(pageNumber:number , pageSize:number)
    {
      this.pageNumber = pageNumber==0? 1 :pageNumber;
      this.pageSize = pageSize;      
    }
    //getter
    getCurrentPageNumber() : number
    {
      return this.pageNumber;
    }
    getCurrentPageSize() : number
    {
      return this.pageSize;
    }
}

