import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionCreateFormComponent } from './section-create-form.component';

describe('SectionCreateFormComponent', () => {
  let component: SectionCreateFormComponent;
  let fixture: ComponentFixture<SectionCreateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SectionCreateFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
