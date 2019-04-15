import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../Services/Employee/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-saloon-nav',
  templateUrl: './saloon-nav.component.html',
  styleUrls: ['./saloon-nav.component.css']
})
export class SaloonNavComponent implements OnInit {

  token:string;

  ngOnInit(): void {
    if(localStorage.getItem('Token')!=null || localStorage.getItem('Token')!=undefined)
    {
      console.log('ngOnIt Called')
      this.token = localStorage.getItem('Token');
      console.log(this.token+' in SaloonNav')
      this.route.navigate(['/'])  
    }
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver, private authService:AuthService,private route:Router) {}
  LogOut()
  {
    console.log('Nav Called')
      this.authService.logOut();
      this.token = null;
      console.log('Nav Called Ended')
      this.ngOnInit();
      this.route.navigate(['/'])
  }
}
