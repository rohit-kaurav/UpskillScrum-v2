import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IterationFormComponent } from './iteration-form.component';

describe('IterationFormComponent', () => {
  let component: IterationFormComponent;
  let fixture: ComponentFixture<IterationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IterationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IterationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
