import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificarDatosGralComponent } from './verificar-datos-gral.component';

describe('VerificarDatosGralComponent', () => {
  let component: VerificarDatosGralComponent;
  let fixture: ComponentFixture<VerificarDatosGralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerificarDatosGralComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerificarDatosGralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
