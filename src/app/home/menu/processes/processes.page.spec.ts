import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {ProcessesPage} from './processes.page';

describe('ProcessesPage', () => {
  let component: ProcessesPage;
  let fixture: ComponentFixture<ProcessesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProcessesPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProcessesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
