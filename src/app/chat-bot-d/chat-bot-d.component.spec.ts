import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatBotDComponent } from './chat-bot-d.component';

describe('ChatBotDComponent', () => {
  let component: ChatBotDComponent;
  let fixture: ComponentFixture<ChatBotDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatBotDComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChatBotDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
