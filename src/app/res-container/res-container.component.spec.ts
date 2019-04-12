import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResContainerComponent } from './res-container.component';

describe('ResContainerComponent', () => {
  let component: ResContainerComponent;
  let fixture: ComponentFixture<ResContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
