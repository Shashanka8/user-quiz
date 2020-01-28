import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  model = {
    email: "",
    password: ""
  };
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  serverErrorMessages: string;

  ngOnInit() {
    if (this.userService.isLoggedIn())
      this.router.navigateByUrl("/userprofile");
  }

  onSubmit(form: NgForm) {

    this.userService.login(form.value).subscribe(
      res => {
        this.userService.setToken(res["token"]);
        this.router.navigateByUrl("/userprofile");
      },
      err => {
        this.serverErrorMessages = err.error.message;
      }
    );
  }

}
