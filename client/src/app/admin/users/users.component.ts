import { UserService } from './../../services/user.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { slideHorizontal, fade } from '../../animations/animation-effects.component.animation';
import { User } from '../../models/user.model';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  animations: [slideHorizontal, fade]
})
export class UsersComponent{

  constructor(private userservice: UserService) {
    this.currentUser = this.userservice.getCurrentUser();
  }

  currentUser:any;
  showForm = false;
}
