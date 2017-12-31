import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripProposalComponent } from './trip-proposal.component';

describe('TripProposalComponent', () => {
  let component: TripProposalComponent;
  let fixture: ComponentFixture<TripProposalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripProposalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripProposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
