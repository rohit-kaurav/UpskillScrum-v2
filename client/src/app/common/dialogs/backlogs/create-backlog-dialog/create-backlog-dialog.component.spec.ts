import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBacklogDialogComponent } from './create-backlog-dialog.component';

describe('CreateBacklogDialogComponent', () => {
  let component: CreateBacklogDialogComponent;
  let fixture: ComponentFixture<CreateBacklogDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateBacklogDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBacklogDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
