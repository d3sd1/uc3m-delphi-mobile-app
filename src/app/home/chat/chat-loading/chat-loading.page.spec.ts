import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {ChatLoadingPage} from './chat-loading.page';

describe('LoadingPage', () => {
  let component: ChatLoadingPage;
  let fixture: ComponentFixture<ChatLoadingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChatLoadingPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChatLoadingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
