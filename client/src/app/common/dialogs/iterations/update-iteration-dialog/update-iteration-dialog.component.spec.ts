import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateIterationDialogComponent } from './update-iteration-dialog.component';

describe('UpdateIterationDialogComponent', () => {
  let component: UpdateIterationDialogComponent;
  let fixture: ComponentFixture<UpdateIterationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateIterationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateIterationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
