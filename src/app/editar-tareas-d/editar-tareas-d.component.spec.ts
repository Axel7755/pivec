import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarTareasDComponent } from './editar-tareas-d.component';

describe('EditarTareasDComponent', () => {
  let component: EditarTareasDComponent;
  let fixture: ComponentFixture<EditarTareasDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarTareasDComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarTareasDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
