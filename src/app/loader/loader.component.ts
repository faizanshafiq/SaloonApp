import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

//import { LoaderService } from './loader.service';
import { ProgressBar} from '../Services/shared/progressBar.service';

@Component({
    selector: 'angular-loader',
    templateUrl: 'loader.component.html',
    styleUrls: ['loader.component.css']
})
export class LoaderComponent implements OnInit  {

    show:boolean;
    private subscription: Subscription;

    constructor(private progressBar:ProgressBar) { }

    ngOnInit() { 
        //this.show = false;
        this.progressBar.currentMessage.subscribe(message => this.show = message)
    }
}