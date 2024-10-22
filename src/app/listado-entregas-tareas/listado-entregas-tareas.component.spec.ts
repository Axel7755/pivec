import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoEntregasTareasComponent } from './listado-entregas-tareas.component';

describe('ListadoEntregasTareasComponent', () => {
  let component: ListadoEntregasTareasComponent;
  let fixture: ComponentFixture<ListadoEntregasTareasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoEntregasTareasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListadoEntregasTareasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
