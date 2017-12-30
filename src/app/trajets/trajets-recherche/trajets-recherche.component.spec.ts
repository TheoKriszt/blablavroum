import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TrajetsRechercheComponent} from './trajets-recherche.component';

describe('TrajetsRechercheComponent', () => {
  let component: TrajetsRechercheComponent;
  let fixture: ComponentFixture<TrajetsRechercheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrajetsRechercheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrajetsRechercheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
