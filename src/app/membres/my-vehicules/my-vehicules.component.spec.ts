import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyVehiculesComponent } from './my-vehicules.component';

describe('MyVehiculesComponent', () => {
  let component: MyVehiculesComponent;
  let fixture: ComponentFixture<MyVehiculesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyVehiculesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyVehiculesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
