import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { environment } from "../../environments/environment";
import { map, catchError } from 'rxjs/operators';
import { Quiz } from './quiz.model';
import { QuizQuestion } from '../model/QuizQuestion';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  noAuthHeader = { headers: new HttpHeaders({ NoAuth: "True" }) };

  constructor(private http: HttpClient) { }

  data:QuizQuestion[];
  setData(data){
    this.data=data;
  }
  getData(){
    let temp=this.data;
    return temp;
  }

  getAllQuiz():Observable<QuizQuestion[]> {
    return this.http.get<QuizQuestion[]>(environment.apiQuizUrl + "/allquiz");
  }
  // .pipe(map((response) => response as QuizQuestion))
  sendResults(results){
    return this.http.post(environment.apiQuizUrl + "/createquizresult",results, {responseType: 'text'});
    // .pipe(
    //   catchError(this.handleError('error'))
    // );
  }
}
