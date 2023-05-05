import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBackgroundComponent } from './side-background.component';

describe('SideBackgroundComponent', () => {
  let component: SideBackgroundComponent;
  let fixture: ComponentFixture<SideBackgroundComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SideBackgroundComponent]
    });
    fixture = TestBed.createComponent(SideBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
