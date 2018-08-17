import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-update-backlog-dialog',
  templateUrl: './update-backlog-dialog.component.html',
  styleUrls: ['./update-backlog-dialog.component.css']
})
export class UpdateBacklogDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
              private dialog: MatDialogRef<UpdateBacklogDialogComponent>) { }

  backlog: any;
  backlogIsUpdated: boolean = false;

  ngOnInit() {
    console.log("backlog update dialog data ",this.data.backlog);
    this.backlog = this.data.backlog;
  }

  closeDialog(){
    this.dialog.close(this.backlogIsUpdated);
  }

  backlogUpdateFlag(isUpdated){
    this.backlogIsUpdated = isUpdated;
    this.closeDialog();
  }

}