import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResWishListComponent } from './res-wish-list.component';

describe('ResWishListComponent', () => {
  let component: ResWishListComponent;
  let fixture: ComponentFixture<ResWishListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResWishListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResWishListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
