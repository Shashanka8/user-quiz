import { Component, OnInit, Output, Input, EventEmitter, SimpleChanges } from '@angular/core';
import { QuizQuestion } from '../../model/QuizQuestion';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { QuizService } from 'src/app/shared/quiz.service';



@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {

  @Output() answer = new EventEmitter<string>();
  @Output() formGroup: FormGroup;
  @Input() question: QuizQuestion;
  @Output() newVal;
  option = '';
  grayBorder = '2px solid #979797';

  constructor(public QuizServ:QuizService) { 
    localStorage.setItem('ans', localStorage.getItem('ans'));
  }

  ngOnInit() {
    this.buildForm();
    console.log('questions --> ', this.question);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.question && changes.question.currentValue && !changes.question.firstChange) {
      this.formGroup.patchValue({ answer: '' });
    }
  }

  buildForm() {
    this.formGroup = new FormGroup({
      answer: new FormControl(['', Validators.required])
    });
  }

  radioChange(answer: string) {
    this.question.selectedOption = answer;
    console.log("Selected Value", this.question.selectedOption);
    this.answer.emit(answer);
    // this.displayExplanation();
  }

  displayExplanation(): void {
    const questionElem = document.getElementById('question');
    if (questionElem !== null) {
      questionElem.innerHTML = 'Option ' + this.question.answer + ' was correct because ' + this.question.explanation + '.';
      questionElem.style.border = this.grayBorder;
    }
  }

  // mark the correct answer regardless of which option is selected once answered
  isCorrect(option: string): boolean {
    return this.question.selectedOption && option === this.question.answer;
  }

  // mark incorrect answer if selected
  isIncorrect(option: string): boolean {
    return option !== this.question.answer && option === this.question.selectedOption;
  }

  onSubmit() {
    this.formGroup.reset({ answer: null });
  }

  arr = [];
  selectionText = [];
  allans = [];
  i=0;
  checkbox(val) {
    this.allans = JSON.parse(localStorage.getItem('ans'));
    console.log('selected value cbox-> ', val);
    console.log('selected value checked-> ', event);
    this.arr.push(val);
    console.log("array of op->  ",this.arr);
    // localStorage.setItem('ans', JSON.stringify(this.arr))
    console.log('Array--> ', this.arr);

  }
  
  ansobj = {};
public myFunc() {
  this.ansobj = {
    lev: this.i,
    data: this.arr
  }
  this.allans = [...this.allans, this.ansobj]
  localStorage.setItem('ans', JSON.stringify(this.allans));
 console.log('all answers--> ',this.allans)
  this.i++;
    // this.QuizServ.setData(this.allans);
}

newRes = {};
  
  public submitQuiz() {
    this.myFunc();
    this.newRes = {
      userID:12345,
      quizID:2,
      results: this.allans
    }
    this.QuizServ.sendResults(this.newRes).subscribe((res)=>{
      console.log("response sendres->  ", res);
    },err => {
      console.log(err);
    })
    // this.showConfirm('Confirmation !!!', '', 'Are you sure you want to submit Quiz?', '');
  }



}
