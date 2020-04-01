import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetortCardComponent } from './retort-card.component';

describe('RetortCardComponent', () => {
  let component: RetortCardComponent;
  let fixture: ComponentFixture<RetortCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetortCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetortCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
