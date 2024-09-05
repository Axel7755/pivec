import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideosCompartidosComponent } from './videos-compartidos.component';

describe('VideosCompartidosComponent', () => {
  let component: VideosCompartidosComponent;
  let fixture: ComponentFixture<VideosCompartidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideosCompartidosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VideosCompartidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
