import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {ProfileBasicPage} from './profile-basic.page';

describe('ProfileBasicPage', () => {
  let component: ProfileBasicPage;
  let fixture: ComponentFixture<ProfileBasicPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileBasicPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileBasicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
