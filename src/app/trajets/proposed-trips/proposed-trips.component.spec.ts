import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposedTripsComponent } from './proposed-trips.component';

describe('ProposedTripsComponent', () => {
  let component: ProposedTripsComponent;
  let fixture: ComponentFixture<ProposedTripsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProposedTripsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposedTripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
