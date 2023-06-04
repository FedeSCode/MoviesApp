import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesWatchedByUserComponent } from './movies-watched-by-user.component';

describe('MoviesWatchedByUserComponent', () => {
  let component: MoviesWatchedByUserComponent;
  let fixture: ComponentFixture<MoviesWatchedByUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MoviesWatchedByUserComponent]
    });
    fixture = TestBed.createComponent(MoviesWatchedByUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
