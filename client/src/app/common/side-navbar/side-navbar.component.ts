import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.css']
})
export class SideNavbarComponent {

  constructor(private router: Router,
              private userservice: UserService)
  {
    this.currentUser = this.userservice.getCurrentUser();
  }

  currentUser: any;

  signOut(){
    localStorage.clear();
    location.reload();
  }
}
