import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultingCompaniesComponent } from './consulting-companies.component';

describe('ConsultingCompaniesComponent', () => {
  let component: ConsultingCompaniesComponent;
  let fixture: ComponentFixture<ConsultingCompaniesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultingCompaniesComponent]
    });
    fixture = TestBed.createComponent(ConsultingCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
