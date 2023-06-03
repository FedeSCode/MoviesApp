import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyListButtonComponent } from './my-list-button.component';

describe('MyListButtonComponent', () => {
  let component: MyListButtonComponent;
  let fixture: ComponentFixture<MyListButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyListButtonComponent]
    });
    fixture = TestBed.createComponent(MyListButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
