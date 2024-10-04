import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearTareasDComponent } from './crear-tareas-d.component';

describe('CrearTareasDComponent', () => {
  let component: CrearTareasDComponent;
  let fixture: ComponentFixture<CrearTareasDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearTareasDComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearTareasDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
