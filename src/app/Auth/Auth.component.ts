import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/Employee/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ProgressBar} from '../Services/shared/progressBar.service';
import { Employee } from '../Services/Employee/Employee';
import {AuthTokenService} from '../auth-token.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-Auth',
  templateUrl: './Auth.component.html',
  styleUrls: ['./Auth.component.css']
})
export class AuthComponent implements OnInit {
  error:string;
  username:any;
  password:any;
  token:string;
  employee: Employee;
  constructor(
    private authService:AuthService,
    private route:ActivatedRoute,
    private progressBar:ProgressBar,
    private routr:Router,
    private authTokenService:AuthTokenService
    ) { }

  ngOnInit() 
  {
    console.log('Auth:  ngOnInit Called')
    if (this.route.snapshot.paramMap.get('errorMessage'))
    {
      this.error =this.route.snapshot.paramMap.get('errorMessage').toString();
      console.log(this.error);
    }
    this.authTokenService.currentToken.subscribe(token => this.token = token)
  }
  login()
  {
      console.log(this.username);
      console.log(this.password);
      this.getAuth();
  }
   getAuth():void
   {
     console.log('Auth: '+this.token)
     if(this.token == null || this.token==undefined){
      this.authService.authEmployee(this.username,this.password).subscribe(
        (x:any) =>
        {

         console.log('Success Called')
         if(x!=null || x!=undefined)
         {
           this.authTokenService.changeToken(x);
         }
         this.authTokenService.currentToken.subscribe(token => this.token = token);
          
         localStorage.setItem('Token', this.token);
  
         this.callRedirect();
        },
        
       (error)=>
       {
         console.log('Error Called')
         console.log(error)
        this.callRedirect();
       },
  
       () => {
        
       });
    
     }
     else{
      this.progressBar.changeMessage(true);
      this.routr.navigate(['/saloonEmployees'])
     }
    
   }

   callRedirect()
   {
     if(this.token != null || this.token!= undefined)
     {
       console.log('Employee Found')
       console.log('Called from saloonEmployees')
       this.progressBar.changeMessage(true);
       this.routr.navigate(['/saloonNav'])
      
     }
     else{
      console.log('Employee Not Found')
       console.log(this.employee)
       console.log('Called from testingAngular')
       this.progressBar.changeMessage(false);
       this.routr.navigate(['/auth',{errorMessage:'Please Login first'}])
 
     }
     
   }
}
