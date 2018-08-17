import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBacklogDialogComponent } from './update-backlog-dialog.component';

describe('UpdateBacklogDialogComponent', () => {
  let component: UpdateBacklogDialogComponent;
  let fixture: ComponentFixture<UpdateBacklogDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateBacklogDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateBacklogDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
