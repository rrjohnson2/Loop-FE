import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageBadgeComponent } from './message-badge.component';

describe('MessageBadgeComponent', () => {
  let component: MessageBadgeComponent;
  let fixture: ComponentFixture<MessageBadgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageBadgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
