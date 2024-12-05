import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasesGrabadasComponent } from './clases-grabadas.component';

describe('ClasesGrabadasComponent', () => {
  let component: ClasesGrabadasComponent;
  let fixture: ComponentFixture<ClasesGrabadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClasesGrabadasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClasesGrabadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
