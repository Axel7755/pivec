import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TareasAComponent } from './tareas-a.component';

describe('TareasAComponent', () => {
  let component: TareasAComponent;
  let fixture: ComponentFixture<TareasAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TareasAComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TareasAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
