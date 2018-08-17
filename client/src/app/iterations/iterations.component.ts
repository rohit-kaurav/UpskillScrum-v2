import { popInOut } from './../animations/animation-effects.component.animation';
import { CreateIterationDialogComponent } from './../common/dialogs/iterations/create-iteration-dialog/create-iteration-dialog.component';
import { MatDialog } from '@angular/material';
import { IterationService } from './../services/iteration.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'iterations',
  templateUrl: './iterations.component.html',
  styleUrls: ['./iterations.component.css'],
  animations: [popInOut]
})
export class IterationsComponent implements OnInit {

  constructor(private iterationservice: IterationService,
              private dialog: MatDialog)
  {

  }

  @Input('project') project: any;

  iterationsArray = new Array();
  notify: boolean = false;
  notifyText: string = "";
  notifyType: string = "";

  ngOnInit() {
    this.getAllIterations();
  }

  getAllIterations() {
    this.iterationservice.getAllIterationsByProjectId(this.project.project_uid).subscribe(
      data => {
        console.log("All iterations data came ", data);
        if (!data.message) {
          this.iterationsArray = data;
        }
      }, error => {
        console.log("All Iterations error came ", error);
      }
    )
  }

  addIteration() {
    this.dialog.open(CreateIterationDialogComponent, {
      data: {
        project: this.project
      },
      minHeight: '500px',
      minWidth: '560px'
    }).afterClosed().subscribe(
      result => {
        if (result) {
          this.iterationsArray.push(result);
          this.showSnackBar("Iteration added successfully!", "success",2500);
        }
      }
    )
  }

  showSnackBar(message:string, action:string,timeLimit:number){
    this.notify = true;
    this.notifyText = message;
    this.notifyType = action;
    setTimeout(() => {
      this.notify = false;
      this.notifyText = "";
      this.notifyType = "";
    }, timeLimit);
  }

}