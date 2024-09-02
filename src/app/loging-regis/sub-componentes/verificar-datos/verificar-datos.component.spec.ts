import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificarDatosComponent } from './verificar-datos.component';

describe('VerificarDatosComponent', () => {
  let component: VerificarDatosComponent;
  let fixture: ComponentFixture<VerificarDatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerificarDatosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerificarDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
