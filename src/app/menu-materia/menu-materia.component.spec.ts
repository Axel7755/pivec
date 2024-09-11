import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuMateriaComponent } from './menu-materia.component';

describe('MenuMateriaComponent', () => {
  let component: MenuMateriaComponent;
  let fixture: ComponentFixture<MenuMateriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuMateriaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuMateriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
