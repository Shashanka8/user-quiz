import { Component, OnInit, Input, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { AlertController, NavController, NavParams } from '@ionic/angular';
import { QuizQuestion } from '../../model/QuizQuestion';
import {QuizService} from '../../shared/quiz.service';



@Component({
  selector: 'app-quiz-section',
  templateUrl: './quiz-section.page.html',
  styleUrls: ['./quiz-section.page.scss'],
})
export class QuizSectionPage implements OnInit {


  @Input() answer: string;
  @Input() formGroup: FormGroup;
  @Output() question : QuizQuestion;
  @Input() allans;
  // @Input() alQuestions;
  totalQuestions: number;
  completionTime: number;
  correctAnswersCount = 0;


  questionID = 0;
  currentQuestion = 0;
  questionIndex: number;
  correctAnswer: boolean;
  hasAnswer: boolean;
  disabled: boolean;
  quizIsOver: boolean;
  progressValue: number;
  timeLeft: number;
  timePerQuestion = 20;
  interval: any;
  elapsedTime: number;
  elapsedTimes = [];
  blueBorder = '2px solid #007aff';

  allQuestions: QuizQuestion[];

  alQuestions: QuizQuestion[] = [
    {
      questionId: 1,
      questionText: 'What is the objective of dependency injection?',
      multiple: true,
      options: [
        { optionValue: '1', optionText: 'Pass the service to the client.' },
        { optionValue: '2', optionText: 'Allow the client to find service.' },
        { optionValue: '3', optionText: 'Allow the client to build service.' },
        { optionValue: '4', optionText: 'Give the client part service.' }
      ],
      answer: '1',
      explanation: 'a service gets passed to the client during DI',
      selectedOption: ''
    },
    {
      questionId: 2,
      questionText: 'Which of the following benefit from dependency injection?',
      multiple: false,
      options: [
        { optionValue: '1', optionText: 'Programming' },
        { optionValue: '2', optionText: 'Testability' },
        { optionValue: '3', optionText: 'Software design' },
        { optionValue: '4', optionText: 'All of the above.' },
      ],
      answer: '4',
      explanation: 'DI simplifies both programming and testing as well as being a popular design pattern',
      selectedOption: ''
    },
    {
      questionId: 3,
      questionText: 'Which of the following is the first step in setting up dependency injection?',
      multiple: false,
      options: [
        { optionValue: '1', optionText: 'Require in the component.' },
        { optionValue: '2', optionText: 'Provide in the module.' },
        { optionValue: '3', optionText: 'Mark dependency as @Injectable().' },
        { optionValue: '4', optionText: 'Declare an object.' }
      ],
      answer: '3',
      explanation: 'the first step is marking the class as @Injectable()',
      selectedOption: ''
    },
    {
      questionId: 4,
      questionText: 'In which of the following does dependency injection occur?',
      multiple: false,
      options: [
        { optionValue: '1', optionText: '@Injectable()' },
        { optionValue: '2', optionText: 'constructor' },
        { optionValue: '3', optionText: 'function' },
        { optionValue: '4', optionText: 'NgModule' },
      ],
      answer: '2',
      explanation: 'object instantiations are taken care of by the constructor in Angular',
      selectedOption: ''
    }
  ];


  constructor(private route: ActivatedRoute,  public QuizeServ: QuizService, private router: Router, public alertController: AlertController, public navcontroller: NavController) {
    this.QuizeServ.getAllQuiz().subscribe((res)=> {
      console.log("response",res);
      
      this.allQuestions = res;
      // localStorage.setItem('data',JSON.stringify(this.allQuestions));
      console.log("All Questions ",this.allQuestions);
         });
    this.route.paramMap.subscribe(params => {
      console.log(params,"params");
      this.setQuestionID(+params.get('questionId'));  // get the question ID and store it
      this.question = this.getQuestion;
      console.log("question", this.question);
      console.log("answer",this.answer);
    });
  }

  

  ngOnInit() {
    this.question = this.getQuestion;
    this.totalQuestions = this.allQuestions.length;
    console.log("total Ques",this.totalQuestions);
    this.timeLeft = this.timePerQuestion;
    this.progressValue = 100 * (this.currentQuestion + 1) / this.totalQuestions;
    // this.countdown();
  }
 
 
  displayNextQuestion() {
    this.resetTimer();
    this.increaseProgressValue();

    this.questionIndex = this.questionID++;

    if (typeof document.getElementById('question') !== 'undefined' && this.getQuestionID() <= this.totalQuestions) {
      document.getElementById('question').innerHTML = this.allQuestions[this.questionIndex]['questionText'];
      document.getElementById('question').style.border = this.blueBorder;
    } else {
      this.navigateToResults();
    }
  }

  /* displayPreviousQuestion() {
    this.resetTimer();
    this.decreaseProgressValue();

    this.questionIndex = this.questionID--;

    if (typeof document.getElementById('question') !== 'undefined' && this.getQuestionID() <= this.totalQuestions) {
      document.getElementById('question').innerHTML = this.allQuestions[this.questionIndex]['questionText'];
      document.getElementById('question').style.border = this.blueBorder;
    } else {
      this.navigateToResults();
    }
  } */
  ansdata = [];
  answe;
  navigateToNextQuestion(): void {
    console.log("clicked");
    if (this.question.selectedOption === '') {
      this.showAlert('Alert', '', 'Please select answer');
    } else {
      this.router.navigate(['/quiz-section', this.getQuestionID() + 1]);
      this.displayNextQuestion();
      // this.answe = localStorage.getItem('ans');
      // console.log('answe ', this.answe)
      // this.ansdata.push(this.answe);
      // console.log('answer', this.ansdata);
    }
  }

  /* navigateToPreviousQuestion(): void {
    this.router.navigate(['/question', this.getQuestionID() - 1]);
    this.displayPreviousQuestion();
  } */

  navigateToResults(): void {
    this.router.navigate(['/results'], {
      state:
      {
        totalQuestions: this.totalQuestions,
        correctAnswersCount: this.correctAnswersCount,
        completionTime: this.completionTime,
        allQuestions: this.allQuestions,

      }
    });
  }

  // checks whether the question is valid and is answered correctly
  checkIfAnsweredCorrectly() {
    if (this.isThereAnotherQuestion() && this.isCorrectAnswer()) {
      this.incrementCorrectAnswersCount();
      this.correctAnswer = true;
      this.hasAnswer = true;
      this.disabled = false;

      this.elapsedTime = Math.ceil(this.timePerQuestion - this.timeLeft);
      if (this.getQuestionID() < this.totalQuestions) {
        this.elapsedTimes = [...this.elapsedTimes, this.elapsedTime];
      } else {
        this.elapsedTimes = [...this.elapsedTimes, 0];
        this.completionTime = this.calculateTotalElapsedTime(this.elapsedTimes);
      }

      this.quizDelay(3000);

      // if (this.getQuestionID() < this.totalQuestions) {
      //   this.navigateToNextQuestion();
      // } else {
      //   this.navigateToResults();
      // }
    }
  }

  incrementCorrectAnswersCount() {
    if (this.questionID <= this.totalQuestions && this.isCorrectAnswer()) {
      console.log('qid', this.questionID);
      console.log('total', this.totalQuestions);
      if (this.correctAnswersCount === this.totalQuestions) {
        return this.correctAnswersCount;
        console.log('total correct')
      } else {
        console.log('correct')
        this.correctAnswer = true;
        this.hasAnswer = true;
        return this.correctAnswersCount++;
      }
    } else {
      console.log('not correct')
      this.correctAnswer = false;
      this.hasAnswer = false;
    }
  }

  increaseProgressValue() {
    this.progressValue = parseFloat((100 * (this.getQuestionID() + 1) / this.totalQuestions).toFixed(1));
  }

  /* decreaseProgressValue() {
    this.progressValue = parseFloat((100 * (this.getQuestionID() - 1) / this.totalQuestions).toFixed(1));
  } */

  calculateTotalElapsedTime(elapsedTimes) {
    return this.completionTime = elapsedTimes.reduce((acc, cur) => acc + cur, 0);
  }

  /****************  public API  ***************/
  getQuestionID() {
    return this.questionID;
  }

  setQuestionID(id: number) {
    console.log("qid",id);
    return this.questionID = id;
  }

  isThereAnotherQuestion(): boolean {
    return this.questionID <= this.allQuestions.length;
  }

  isFinalQuestion(): boolean {
    return this.currentQuestion === this.totalQuestions;
  }

  isCorrectAnswer(): boolean {
    return this.question.selectedOption === this.question.answer;
  }

  get getQuestion():QuizQuestion {
    this.allQuestions =this.QuizeServ.getData();
    // this.allQuestions = JSON.parse(localStorage.getItem('data'));
    console.log('getQues', this.allQuestions,"qid",this.questionID)
    return this.allQuestions.filter(
      question => question.questionId === this.questionID
    )[0];
  }

  // countdown clock
  private countdown() {
    if (this.questionID <= this.totalQuestions) {
      this.interval = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
          this.checkIfAnsweredCorrectly();

          if (this.correctAnswersCount <= this.totalQuestions) {
            this.calculateTotalElapsedTime(this.elapsedTimes);
          }
          if (this.timeLeft === 0 && !this.isFinalQuestion()) {
            // this.navigateToNextQuestion();
          }
          if (this.timeLeft === 0 && this.isFinalQuestion()) {
            this.navigateToResults();
          }
          if (this.isFinalQuestion() && this.hasAnswer === true) {
            this.navigateToResults();
            this.quizIsOver = true;
          }

          // disable the next button until an option has been selected
          this.question.selectedOption === '' ? this.disabled = true : this.disabled = false;
        }
      }, 1000);
    }
  }

  private resetTimer() {
    this.timeLeft = this.timePerQuestion;
  }

  quizDelay(milliseconds) {
    const start = new Date().getTime();
    let counter = 0;
    let end = 0;

    while (counter < milliseconds) {
      end = new Date().getTime();
      counter = end - start;
    }
  }

  newRes = {};
  newVal=this.QuizeServ.getData();
  submitQuiz() {
    this.newRes = {
      userID:12345,
      quizID:2,
      results: this.newVal
    }
    this.QuizeServ.sendResults(this.newRes).subscribe((res)=>{
      console.log("response sendres->  ", res);
    },err => {
      console.log(err);
    })
    // this.showConfirm('Confirmation !!!', '', 'Are you sure you want to submit Quiz?', '');
  }

  // alert box
  async showAlert(header: string, subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  // confirm box
  async showConfirm(header: string, subHeader: string, message: string, body: any) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Ok',
          handler: () => {
            setTimeout(() => {
              this.QuizeServ.sendResults({
                userID:12345,
                quizID:2,
                results:localStorage.getItem('ans')
              })
            }, 10000);
            this.showAlert('Info', '', 'Quiz submitted');
            this.navcontroller.navigateForward('/quiz');
          }
        }
      ]
    });
    await alert.present();
  }

}
