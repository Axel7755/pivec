import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoTareasGeneralComponent } from './listado-tareas-general.component';

describe('ListadoTareasGeneralComponent', () => {
  let component: ListadoTareasGeneralComponent;
  let fixture: ComponentFixture<ListadoTareasGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoTareasGeneralComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListadoTareasGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
