import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoRequestConsultantComponent } from './demo-request-consultant.component';

describe('DemoRequestConsultantComponent', () => {
  let component: DemoRequestConsultantComponent;
  let fixture: ComponentFixture<DemoRequestConsultantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DemoRequestConsultantComponent]
    });
    fixture = TestBed.createComponent(DemoRequestConsultantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
