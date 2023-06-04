import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesTimeComponent } from './movies-time.component';

describe('MoviesTimeComponent', () => {
  let component: MoviesTimeComponent;
  let fixture: ComponentFixture<MoviesTimeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MoviesTimeComponent]
    });
    fixture = TestBed.createComponent(MoviesTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
