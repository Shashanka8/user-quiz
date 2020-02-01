import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/shared/quiz.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.page.html',
  styleUrls: ['./quiz.page.scss'],
})
export class QuizPage implements OnInit {

  quizzes;
  constructor(private quizService: QuizService, public modalCtrl: ModalController) { }

  ngOnInit() {
    this.quizService.getAllQuiz().subscribe((res) => {
      console.log('Response Quiz--> ', res);
      this.quizzes = JSON.stringify(res);
    });
  }
  startQuiz() {
    this.router.navigateByUrl('/quiz-section/1');
  }
  close() {
    this.modalCtrl.dismiss();
  }

}
