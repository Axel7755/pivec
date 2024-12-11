import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatBotAComponent } from './chat-bot-a.component';

describe('ChatBotAComponent', () => {
  let component: ChatBotAComponent;
  let fixture: ComponentFixture<ChatBotAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatBotAComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChatBotAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
