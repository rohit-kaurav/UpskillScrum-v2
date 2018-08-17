import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProjectTableComponent } from './admin-project-table.component';

describe('AdminProjectTableComponent', () => {
  let component: AdminProjectTableComponent;
  let fixture: ComponentFixture<AdminProjectTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminProjectTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProjectTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
