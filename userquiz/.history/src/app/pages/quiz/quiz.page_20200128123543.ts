import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/shared/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.page.html',
  styleUrls: ['./quiz.page.scss'],
})
export class QuizPage implements OnInit {

  quizzes;
  constructor(private quizService: QuizService) { }

  ngOnInit() {
    this.quizService.getAllQuiz().subscribe((res) => {
      console.log('Response Quiz--> ', res)
      this.quizzes = res;
    })
  }

}
