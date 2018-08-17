import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-update-project-dialog',
  templateUrl: './update-project-dialog.component.html',
  styleUrls: ['./update-project-dialog.component.css']
})
export class UpdateProjectDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<UpdateProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any) {
    console.log("data coming in update dialog ", data);
    this.project = data.project;
  }

  project: any;
  updateFlag:boolean = false;

  ngOnInit() {
  }

  closeDialog(){
    this.dialogRef.close(this.updateFlag);
  }

  projectUpdateFlag(isUpdated){
    this.updateFlag = isUpdated;
    this.closeDialog();
  }
}