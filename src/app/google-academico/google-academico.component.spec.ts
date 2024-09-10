import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleAcademicoComponent } from './google-academico.component';

describe('GoogleAcademicoComponent', () => {
  let component: GoogleAcademicoComponent;
  let fixture: ComponentFixture<GoogleAcademicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoogleAcademicoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GoogleAcademicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
