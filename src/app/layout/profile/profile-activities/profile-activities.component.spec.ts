import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileActivitiesComponent } from './profile-activities.component';

describe('ProfileActivitiesComponent', () => {
  let component: ProfileActivitiesComponent;
  let fixture: ComponentFixture<ProfileActivitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileActivitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
