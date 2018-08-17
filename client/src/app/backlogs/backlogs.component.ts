import { DialogBoxComponent } from './../common/dialog-box/dialog-box.component';
import { BacklogService } from './../services/backlog.service';
import { popInOut } from './../animations/animation-effects.component.animation';
import { CreateBacklogDialogComponent } from './../common/dialogs/backlogs/create-backlog-dialog/create-backlog-dialog.component';
import { MatDialog } from '@angular/material';
import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'backlogs',
  templateUrl: './backlogs.component.html',
  styleUrls: ['./backlogs.component.css'],
  animations: [popInOut]
})
export class BacklogsComponent implements OnInit {

  constructor(private userservice: UserService,
              private backlogservice: BacklogService,
              private dialog: MatDialog) {
    this.currentUser = this.userservice.getCurrentUser();
  }

  backlogsArray = new Array();
  @Input('project') project: any;

  currentUser: any;
  private users = {};
  notify: boolean = false;
  notifyText: string = "";
  notifyType: string = "";

  ngOnInit() {
    this.getAllBacklogs();
    this.getAllEmployees();
  }

  // function to get backlog data using backlog_uid
  getAllBacklogs() {
    this.backlogservice.getAllBacklogsWithProject(this.project.project_uid)
      .subscribe(
        data => {
          console.log("Backlog Data ", data)
          if(!data.message){
            if (this.currentUser.role != 'manager') {
              for (let i = 0; i < data.length; i++) {
                if (data[i].assigned_to == this.currentUser.employee_id) {
                  this.backlogsArray.push(data[i])
                }
              }
            } else {
              this.backlogsArray = data;
            }
          }
        },
        error => {
          console.log("Backlog Error ", error)
        }
      )
  }

  getAllEmployees(){
    this.userservice.getAllUsersByRole('employee').subscribe(
      data => {
        console.log("Employee Users data came ", data);
        if(!data.message){
          for(let i=0;i<data.length;i++){
            this.users[data[i].employee_id]=data[i].username;
          }
        }
      },error => {
        console.log("Employee Users error came ",error);
      }
    )
  }

  addBacklog() {
    this.dialog.open(CreateBacklogDialogComponent, {
      data: {
        project: this.project
      },
      minHeight: 500,
      minWidth: 600
    }).afterClosed().subscribe(
      data => {
        if (data) {
          this.backlogsArray.push(data);
          this.showSnackBar("Backlog added successfully!", "success", 2500);
        }
      }
    )
  }

  showSnackBar(message: string, type: string, interval: number) {
    this.notifyText = message;
    this.notifyType = type;
    this.notify = true;
    setTimeout(() => {
      this.notify = false;
      this.notifyText = "";
      this.notifyType = "";
    }, interval);
  }
}
