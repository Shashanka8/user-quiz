import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuizSectionPage } from './quiz-section.page';

const routes: Routes = [
  {
    path: '',
    component: QuizSectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuizSectionPageRoutingModule {}
