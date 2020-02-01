import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuizSectionPageRoutingModule } from './quiz-section-routing.module';

import { QuizSectionPage } from './quiz-section.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    QuizSectionPageRoutingModule
  ],
  declarations: [QuizSectionPage]
})
export class QuizSectionPageModule { }
