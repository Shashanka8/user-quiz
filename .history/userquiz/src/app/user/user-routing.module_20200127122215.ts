import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserPage } from './user.page';
import { SignInComponent } from './sign-in/sign-in.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: UserPage
  // },
  // {
  //   path: 'signup', component: UserPage,
  //   children: [{ path: '', component: SignUpComponent }]
  // },
  {
    path: 'login', component: UserPage,
    children: [{ path: '', component: SignInComponent }]
  },
  // {
  //   path: '', redirectTo: '/login', pathMatch: 'full'
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserPageRoutingModule { }
