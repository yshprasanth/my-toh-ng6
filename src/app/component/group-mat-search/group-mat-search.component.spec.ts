import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupMatSearchComponent } from './group-mat-search.component';

describe('GroupMatSearchComponent', () => {
  let component: GroupMatSearchComponent;
  let fixture: ComponentFixture<GroupMatSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupMatSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupMatSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
