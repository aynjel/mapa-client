import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoSidebarLayoutComponent } from './no-sidebar-layout.component';

describe('NoSidebarLayoutComponent', () => {
  let component: NoSidebarLayoutComponent;
  let fixture: ComponentFixture<NoSidebarLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoSidebarLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NoSidebarLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
