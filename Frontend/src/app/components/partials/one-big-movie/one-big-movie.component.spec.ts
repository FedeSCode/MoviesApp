import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneBigMovieComponent } from './one-big-movie.component';

describe('OneBigMovieComponent', () => {
  let component: OneBigMovieComponent;
  let fixture: ComponentFixture<OneBigMovieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OneBigMovieComponent]
    });
    fixture = TestBed.createComponent(OneBigMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
