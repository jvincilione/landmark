import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaithComponent } from './faith.component';

describe('FaithComponent', () => {
  let component: FaithComponent;
  let fixture: ComponentFixture<FaithComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaithComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaithComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
