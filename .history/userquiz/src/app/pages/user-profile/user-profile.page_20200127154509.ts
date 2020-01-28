import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {

  userDetails;
  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit() {

    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res["user"];
      },
      err => { }
    );
  }

  onLogout() {
    this.userService.deleteToken();
    this.router.navigate(["/login"]);
  }

}
