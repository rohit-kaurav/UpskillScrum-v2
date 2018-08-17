import { DialogBoxComponent } from './../../common/dialog-box/dialog-box.component';
import { UserService } from './../../services/user.service';
import { BacklogService } from './../../services/backlog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { IterationService } from './../../services/iteration.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UpdateIterationDialogComponent } from '../../common/dialogs/iterations/update-iteration-dialog/update-iteration-dialog.component';

@Component({
  selector: 'iteration-info',
  templateUrl: './iteration-info.component.html',
  styleUrls: ['./iteration-info.component.css']
})
export class IterationInfoComponent implements OnInit {

  constructor(private iterationservice: IterationService,
              private backlogservice: BacklogService,
              private snackbar: MatSnackBar,
              private userservice: UserService,
              private route: ActivatedRoute,
              private router: Router,
              private dialog: MatDialog)
  {

  }

  @ViewChild('addBacklogToIteration') addBacklogSelector: ElementRef;

  iteration: any;
  backlogsArray = new Array();
  allBacklogsArray = new Array();
  statusColor: string;
  users: any = {};
  addBacklogSelectValue = "";

  ngOnInit() {
    let iterationUid = this.route.snapshot.params['id'];
    this.getIterationData(iterationUid);
    this.getBacklogsInIteration(iterationUid);
  }

  getIterationData(iteration_uid) {
    this.iterationservice.getIteration(iteration_uid).subscribe(
      data => {
        console.log("Iteration info data came ", data);
        this.iteration = data;
        this.getAllBacklogsNotInIteration(this.iteration.project_uid);
        this.setStatusColor();
      }, error => {
        console.log("Iteration info error came ", error);
      }
    )
  }

  getBacklogsInIteration(iteration_uid){
    this.backlogservice.getAllBacklogsWithIteration(iteration_uid).subscribe(
      data => {
        console.log("all iteration backlogs data came ",data);
        if(!data.message){
          this.backlogsArray = data;
          this.getAllEmployees();
        }
      },error => {
        console.log("all iteration backlogs error came ",error);
      }
    )
  }

  getAllBacklogsNotInIteration(project_uid){
    this.backlogservice.getAllBacklogsWithProject(project_uid).subscribe(
      data => {
        console.log("all backlogs without iteration came ",data);
        if(!data.message){
          this.allBacklogsArray = [];
          for(let i=0;i<data.length;i++){
            if(data[i].iteration_uid==""){
              this.allBacklogsArray.push(data[i]);
            }
          }
          this.resetForm();
        }
      },error => {
        console.log("all backlogs without iteration error came ",error);
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

  setStatusColor() {
    if (this.iteration['status'] == 'New') this.statusColor = "#5DADE2";
    else if (this.iteration['status'] == 'In Progress') this.statusColor = "#DC7633";
    else if (this.iteration['status'] == 'Completed') this.statusColor = "#2ECC71";
    else if (this.iteration['status'] == 'Hold') this.statusColor = "#757476";
  }

  addBacklogInIteration(backlog){
    console.log("adding backlog to iteration ",backlog);
    if(backlog!=null || backlog!=""){
      let backlogData = {
        backlog_uid: backlog.backlog_uid,
        backlog_name: backlog.backlog_name,
        backlog_description: backlog.backlog_description,
        iteration_uid: this.iteration.iteration_uid,
        status: backlog.status
      }
      this.backlogservice.updateBacklog(backlogData).subscribe(
        data => {
          console.log("backlog added to iteration ",data);
          if(data.message=="Updated Successfully."){
            this.backlogsArray.push(backlog);
            this.getAllBacklogsNotInIteration(this.iteration.project_uid);
            this.openSnackBar("Backlog added!","close",2500);
          }
        },error => {
          console.log("backlog add failed ",error);
        }
      )
    }
  }

  deleteIteration(){
    if(this.backlogsArray.length){
      this.openSnackBar("Iteration contains backlogs, cannot be deleted!", "close",5000);
    }else{
      this.openDialog("Delete","Do you want to delete "+this.iteration.iteration_name+" ?").subscribe(
        result => {
          if(result){
            this.iterationservice.deleteIteration(this.iteration.iteration_uid).subscribe(
              data => {
                console.log("iteration delete success ",data);
                if(data.message=="Deleted Successfully."){
                  this.router.navigate(['/project',this.iteration.project_uid]);
                }
              },error => {
                console.log("iteration delete failed ",error);
                this.openSnackBar("Iteration delete failed!","close",2500);
              }
            )
          }
        }
      )
    }
  }

  editIteration(){
    this.dialog.open(UpdateIterationDialogComponent,{
      minHeight: '500px',
      minWidth: '600px',
      data: {
        iteration: this.iteration
      }
    }).afterClosed().subscribe(result => {
      if(result){
        this.getIterationData(this.iteration.iteration_uid);
      }
    })
  }

  removeBacklog(backlog){
    this.openDialog("Remove Backlog","Are you sure to remove this backlog?").subscribe(
      result => {
        if(result){
          let backlogData = {
            backlog_uid: backlog.backlog_uid,
            backlog_name: backlog.backlog_name,
            backlog_description: backlog.backlog_description,
            iteration_uid: "",
            status: backlog.status
          }
          this.backlogservice.updateBacklog(backlogData).subscribe(
            data => {
              console.log("backlog removed from iteration ",data)
              if(data.message=="Updated Successfully."){
                for(let i=0;i<this.backlogsArray.length;i++){
                  if(this.backlogsArray[i].backlog_uid==backlog.backlog_uid){
                    this.backlogsArray.splice(i,1);
                    this.getAllBacklogsNotInIteration(this.iteration.project_uid);
                    break;
                  }
                }
                this.openSnackBar("Backlog removed from Iteration!","close",2500);
              }
            },error => {
              console.log("backlog remove failed from iteration ",error);
              this.openSnackBar("Could not remove backlog from iteration, try again!","close",2500);
            }
          )
        }
      }
    )
  }

  resetForm(){
    this.addBacklogSelectValue = "";
  }

  openDialog(title: string, message: string){
    return this.dialog.open(DialogBoxComponent,{
      minHeight: '350px',
      minWidth: '500px',
      data: {
        title: title,
        content: message
      }
    }).afterClosed();
  }

  openSnackBar(message: string, action: string, timeLimit: number){
    this.snackbar.open(message,action,{ 
      duration: timeLimit,
      direction: 'ltr'
    });
  }

}