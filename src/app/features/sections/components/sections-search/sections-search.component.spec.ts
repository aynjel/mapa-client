import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionsSearchComponent } from './sections-search.component';

describe('SectionsSearchComponent', () => {
  let component: SectionsSearchComponent;
  let fixture: ComponentFixture<SectionsSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionsSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SectionsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
