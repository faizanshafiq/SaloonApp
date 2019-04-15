import { Component, OnInit,NgModule } from '@angular/core';


@Component({
  selector: 'app-test-c',
  templateUrl: './test-c.component.html',
  styleUrls: ['./test-c.component.scss']
})
export class TestCComponent implements OnInit {
  favoriteSeason: string;
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
  ngOnInit() {
  }

}


