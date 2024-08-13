import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainTopNavComponent } from './main-top-nav.component';

describe('MainTopNavComponent', () => {
  let component: MainTopNavComponent;
  let fixture: ComponentFixture<MainTopNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainTopNavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainTopNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
