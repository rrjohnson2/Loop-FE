import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BitContentComponent } from './bit-content.component';

describe('BitContentComponent', () => {
  let component: BitContentComponent;
  let fixture: ComponentFixture<BitContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BitContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BitContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
