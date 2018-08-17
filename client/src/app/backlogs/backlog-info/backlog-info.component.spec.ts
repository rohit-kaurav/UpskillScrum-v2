import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BacklogInfoComponent } from './backlog-info.component';

describe('BacklogInfoComponent', () => {
  let component: BacklogInfoComponent;
  let fixture: ComponentFixture<BacklogInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BacklogInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BacklogInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
