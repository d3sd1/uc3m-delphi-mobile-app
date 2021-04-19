import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {ModifyPage} from './modify.page';

describe('CreatePage', () => {
  let component: ModifyPage;
  let fixture: ComponentFixture<ModifyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModifyPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModifyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should modify', () => {
    expect(component).toBeTruthy();
  });
});
