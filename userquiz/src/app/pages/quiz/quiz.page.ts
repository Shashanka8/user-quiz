import { Component, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import {QuizService} from '../../shared/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.page.html',
  styleUrls: ['./quiz.page.scss'],
})
export class QuizPage implements OnInit {
// @Output() alQuestions;
  quizzes; 
  allQuestions: any;
  constructor(public QuizeServ: QuizService, private router: Router, public modalCtrl: ModalController) {
    this.QuizeServ.getAllQuiz().subscribe((res)=> {
      console.log("response",res);
      this.allQuestions=res;
      this.QuizeServ.setData(this.allQuestions);
      // localStorage.setItem('data',JSON.stringify(this.allQuestions));
      console.log("All Qustions ",this.allQuestions);
    });
    localStorage.setItem('ans', JSON.stringify([]));
   }

  ngOnInit() {
  }
  startQuiz() {
    this.router.navigateByUrl('/quiz-section/1');
  }
  close() {
    this.modalCtrl.dismiss();
  }

}
