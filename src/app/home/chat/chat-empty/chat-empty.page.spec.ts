import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {ChatEmptyPage} from './chat-empty.page';

describe('EmptyPage', () => {
  let component: ChatEmptyPage;
  let fixture: ComponentFixture<ChatEmptyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChatEmptyPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChatEmptyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
