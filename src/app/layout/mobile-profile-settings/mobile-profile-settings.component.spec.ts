import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileProfileSettingsComponent } from './mobile-profile-settings.component';

describe('MobileProfileSettingsComponent', () => {
  let component: MobileProfileSettingsComponent;
  let fixture: ComponentFixture<MobileProfileSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileProfileSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileProfileSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
