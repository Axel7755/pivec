import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { GoogleAcademicoComponent } from './google-academico.component';

describe('GoogleAcademicoComponent', () => {
  let component: GoogleAcademicoComponent;
  let fixture: ComponentFixture<GoogleAcademicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GoogleAcademicoComponent],
      imports: [FormsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GoogleAcademicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});