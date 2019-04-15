import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaloonEmployeesComponent } from './saloon-employees.component';

describe('SaloonEmployeesComponent', () => {
  let component: SaloonEmployeesComponent;
  let fixture: ComponentFixture<SaloonEmployeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaloonEmployeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaloonEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
