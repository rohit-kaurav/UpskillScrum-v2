import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IterationInfoComponent } from './iteration-info.component';

describe('IterationInfoComponent', () => {
  let component: IterationInfoComponent;
  let fixture: ComponentFixture<IterationInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IterationInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IterationInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
