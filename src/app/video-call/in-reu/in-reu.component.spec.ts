import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InReuComponent } from './in-reu.component';

describe('InReuComponent', () => {
  let component: InReuComponent;
  let fixture: ComponentFixture<InReuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InReuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InReuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
