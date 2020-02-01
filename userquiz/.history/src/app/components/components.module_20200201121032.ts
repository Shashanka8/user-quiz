import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { QuestionComponent } from './question/question.component';
import { MatCardModule } from '@angular/material/card';
// import { MaterialModule } from '../../../src/app/material.module';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { QuestionMainComponent } from './question-main/question-main.component';
// import { PopoverComponent } from './popover/popover.component';
@NgModule({
    imports: [
        CommonModule,
        IonicModule.forRoot(),
        MatCardModule,
        MatRadioModule,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule],
    declarations: [QuestionComponent, QuestionMainComponent],
    exports: [QuestionComponent, QuestionMainComponent]
})

export class ComponentsModule {

}
