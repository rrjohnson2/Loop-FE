import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeBadgeComponent } from './notice-badge.component';

describe('NoticeBadgeComponent', () => {
  let component: NoticeBadgeComponent;
  let fixture: ComponentFixture<NoticeBadgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoticeBadgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticeBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
