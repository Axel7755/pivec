import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisarTareasDComponent } from './revisar-tareas-d.component';

describe('RevisarTareasDComponent', () => {
  let component: RevisarTareasDComponent;
  let fixture: ComponentFixture<RevisarTareasDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RevisarTareasDComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RevisarTareasDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
