import { IterationService } from './../../services/iteration.service';
import { Router } from '@angular/router';
import { UpdateBacklogDialogComponent } from './../../common/dialogs/backlogs/update-backlog-dialog/update-backlog-dialog.component';
import { DialogBoxComponent } from './../../common/dialog-box/dialog-box.component';
import { FormBuilder } from '@angular/forms';
import { UserService } from './../../services/user.service';
import { fade } from './../../animations/animation-effects.component.animation';
import { ActivatedRoute } from '@angular/router';
import { BacklogService } from './../../services/backlog.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';

@Component({
  selector: 'backlog-info',
  templateUrl: './backlog-info.component.html',
  styleUrls: ['./backlog-info.component.css'],
  animations: [fade]
})
export class BacklogInfoComponent implements OnInit {

  constructor(private backlogservice: BacklogService,
              private userservice: UserService,
              private iterationservice: IterationService,
              private fb: FormBuilder,
              private dialog: MatDialog,
              private snackbar: MatSnackBar,
              private router: Router,
              private route: ActivatedRoute) 
  {
    this.currentUser = this.userservice.getCurrentUser();
    this.updateBacklogForm = fb.group({
      assignee: [this.backlog ? this.backlog.assigned_to : 'Unassigned'],
      backlogstatus: ['']
    })
  }

  backlog: any;
  statusColor: any;
  updateBacklogForm: any;
  currentUser: any;
  users = {};
  allEmployees = new Array();
  commentsArray = new Array();
  iterations = {};
  commentText: string;
  invalidForm: boolean = false;

  ngOnInit() {
    let backlog_uid: string;
    // Collecting route parameters
    this.route.paramMap.subscribe(
      params => {
        backlog_uid = params.get('id');
      }
    )
    this.getBacklog(backlog_uid);
    this.getAllEmployees();
  }

  get assignee() {
    return this.updateBacklogForm.get('assignee');
  }

  get backlogstatus() {
    return this.updateBacklogForm.get('backlogstatus');
  }

  // function to fetch backlog data using backlog_uid
  getBacklog(backlog_uid){
    this.backlogservice.getBacklogWithBacklogId(backlog_uid).subscribe(
      data => {
        console.log("Backlog info data came ", data);
        this.backlog = data;
        this.getAllIterationsOfProject(this.backlog.project_uid);
        this.commentsArray = this.backlog.comments;
        this.commentsArray = this.commentsArray.reverse();
        if (this.backlog['status'] == 'New') this.statusColor = "#5DADE2";
        else if (this.backlog['status'] == 'In Progress') this.statusColor = "#DC7633";
        else if (this.backlog['status'] == 'Completed') this.statusColor = "#2ECC71";
        else if (this.backlog['status'] == 'Hold') this.statusColor = "#757476";
        this.updateBacklogForm.get('assignee').setValue(this.backlog.assigned_to);
      }, error => {
        console.log("Backlog info error came ", error);
      }
    )
  }

  getAllUsers(){
    this.userservice.getAllUsers().subscribe(
      data => {
        console.log("Users came in backlog-info ",data);
        if(!data.message){
          for(let i=0;i<data.length;i++){
            if(data[i].employee_id!='000000'){
              this.users[data[i].employee_id]=data[i].username;
            }
          }
        }
      },error => {
        console.log("error, Unable to fetch users in backlog-info ",error);
      }
    )
  }

  getAllIterationsOfProject(project_uid){
    this.iterationservice.getAllIterationsByProjectId(project_uid).subscribe(
      data => {
        console.log("iterations data came for backlogs ",data);
        if(!data.message){
          for(let i=0;i<data.length;i++){
            this.iterations[data[i].iteration_uid]=data[i].iteration_name;
          }
        }
      },error => {
        console.log("iterations not fetched for backlogs error ",error);
      }
    )
  }

  // function to fetch employee list
  getAllEmployees(){
    this.userservice.getAllUsersByRole('employee').subscribe(
      data => {
        console.log("All employee users data came ", data);
        this.allEmployees = data;
      }, error => {
        console.log("All Employees users error came ", error);
      }
    )
  }

  // function to update assignee and status of backlog, called when update button is clicked
  updateBacklogStatusAndAssignee() {
    if (this.assignee.value != this.backlog.assigned_to) {
      let backlogData = {
        backlog_uid: this.backlog.backlog_uid,
        assigned_to: this.assignee.value
      }
      this.backlogservice.updateBacklogAssignee(backlogData).subscribe(
        data => {
          console.log("Backlog user assigned success data came ", data);
          this.openSnackBar("Backlog updated successfully!",'close',3000);
          this.getBacklog(this.backlog.backlog_uid);
        }, error => {
          console.log("Backlog user assigned failure error came ", error);
          this.openSnackBar("Failed to assign user!","close",3500);
        }
      )
    }
    if (this.backlogstatus.value!="" && this.backlogstatus.value != null && this.backlogstatus.value != this.backlog.status) {
      let backlogData = {
        backlog_uid: this.backlog.backlog_uid,
        backlog_name: this.backlog.backlog_name,
        backlog_description: this.backlog.backlog_description,
        iteration_uid: this.backlog.iteration_uid,
        status: this.backlogstatus.value
      }
      this.backlogservice.updateBacklog(backlogData).subscribe(
        data => {
          console.log("Backlog status update response came ", data);
          this.openSnackBar("Backlog updated successfully!","close",2500); 
          this.getBacklog(this.backlog.backlog_uid);         
        }, error => {
          console.log("Backlog status update error came ", error);
          this.openSnackBar("Failed to update status!","close",3500);          
        }
      )
    }
  }

  editBacklog(){
    this.dialog.open(UpdateBacklogDialogComponent,{
      data: {
        backlog: this.backlog
      },
      minHeight: '500px',
      minWidth: '550px'
    }).afterClosed().subscribe(
      result => {
        if(result){
          this.getBacklog(this.backlog.backlog_uid);
          this.openSnackBar("Backlog updated successfully!","close",2000);
        }
      }
    )
  }

  deleteBacklog(){
    this.dialog.open(DialogBoxComponent, {
      data: {
        title: 'Delete',
        content: "Do you want to delete backlog '"+this.backlog.backlog_name+"' ?"
      },
      minWidth: '360px'
    }).afterClosed().subscribe(
      result => {
        if(result){
          this.backlogservice.deleteBacklog(this.backlog.backlog_uid).subscribe(
            data => {
              if(data.message=='Deleted Successfully.'){
                this.router.navigate(['/project',this.backlog.project_uid]);
              }else {
                this.openSnackBar("Backlog deletion failed!","close",2500);
              }
            },error => {
              console.log("Backlog deletion error came ",error);             
            }
          )
        }
      }
    )
  }

  // function to add comment to backlog, called when 'Send' button clicked
  addComment(comment) {
    console.log("comment form data ", comment);
    if (comment.invalid) {
      this.invalidForm = true;
      setTimeout(() => {
        this.invalidForm = false;
      }, 2500);
    } else {
      let newComment = {
        backlog_uid: this.backlog.backlog_uid,
        author: this.currentUser.employee_id,
        content: comment.value.commentText
      }
      this.backlogservice.addComment(newComment).subscribe(
        commentdata => {
          console.log("Comment add data came ", commentdata);
          this.getBacklog(this.backlog.backlog_uid);
          this.commentText = null;
        }, error => {
          console.log("Comment add error came ", error);
        }
      )
    }
  }

  deleteComment(comment_uid){
    this.dialog.open(DialogBoxComponent,{
        minWidth: '360px',
        data: {
          title: "Delete",
          content: "Do you want to delete comment?"
        }
      }).afterClosed().subscribe(data => {
        if(data){
          this.backlogservice.deleteComment(comment_uid).subscribe(
            result => {
              console.log("Comment deleted successfully! ",result);
              for(let i=0;i<this.commentsArray.length;i++){
                if(this.commentsArray[i].comment_uid==comment_uid){
                  this.commentsArray.splice(i,1);
                  break;
                }
              }
              this.openSnackBar("Comment delete success!","close",2500);
            },error => {
              console.log("Comment delete failed! ",error);
              this.openSnackBar("Comment delete failed!","close",2500);
            }
          )
        }
      })
  }

  openSnackBar(message:string,action:string, timeLimit:number){
    this.snackbar.open(message,action,{
      duration: timeLimit,
      direction: "ltr"
    });
  }
}