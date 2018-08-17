import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-create-iteration-dialog',
  templateUrl: './create-iteration-dialog.component.html',
  styleUrls: ['./create-iteration-dialog.component.css']
})
export class CreateIterationDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
              private dialog: MatDialogRef<CreateIterationDialogComponent>) { }

  project: any;

  ngOnInit() {
    this.project = this.data.project;
  }

  closeDialog(iteration){
    this.dialog.close(iteration);
  }

}