import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileProfileActivitiesComponent } from './mobile-profile-activities.component';

describe('MobileProfileActivitiesComponent', () => {
  let component: MobileProfileActivitiesComponent;
  let fixture: ComponentFixture<MobileProfileActivitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileProfileActivitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileProfileActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
