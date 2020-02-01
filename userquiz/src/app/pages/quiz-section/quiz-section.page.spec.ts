import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QuizSectionPage } from './quiz-section.page';

describe('QuizSectionPage', () => {
  let component: QuizSectionPage;
  let fixture: ComponentFixture<QuizSectionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizSectionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QuizSectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
