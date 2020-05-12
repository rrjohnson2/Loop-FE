import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogOrSignInComponent } from './log-or-sign-in.component';

describe('LogOrSignInComponent', () => {
  let component: LogOrSignInComponent;
  let fixture: ComponentFixture<LogOrSignInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogOrSignInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogOrSignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
