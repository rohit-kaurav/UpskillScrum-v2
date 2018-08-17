import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateIterationDialogComponent } from './create-iteration-dialog.component';

describe('CreateIterationDialogComponent', () => {
  let component: CreateIterationDialogComponent;
  let fixture: ComponentFixture<CreateIterationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateIterationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateIterationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
