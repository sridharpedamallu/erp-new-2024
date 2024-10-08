import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSideNavComponent } from './main-side-nav.component';

describe('MainSideNavComponent', () => {
  let component: MainSideNavComponent;
  let fixture: ComponentFixture<MainSideNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainSideNavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainSideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
