import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-update-iteration-dialog',
  templateUrl: './update-iteration-dialog.component.html',
  styleUrls: ['./update-iteration-dialog.component.css']
})
export class UpdateIterationDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
              private dialog: MatDialogRef<UpdateIterationDialogComponent>) { }

  iteration: any;
  iterationIsUpdated: boolean = false;

  ngOnInit() {
    console.log("iteration update dialog data ",this.data.iteration);
    this.iteration = this.data.iteration;
  }

  closeDialog(){
    this.dialog.close(this.iterationIsUpdated);
  }

  iterationUpdateFlag(isUpdated){
    this.iterationIsUpdated = isUpdated;
    this.closeDialog();
  }

}