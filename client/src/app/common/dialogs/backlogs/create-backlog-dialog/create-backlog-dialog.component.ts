import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-create-backlog-dialog',
  templateUrl: './create-backlog-dialog.component.html',
  styleUrls: ['./create-backlog-dialog.component.css']
})
export class CreateBacklogDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<CreateBacklogDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private data:any) { }

  project:any;

  ngOnInit() {
    console.log("create backlog dialog data ",this.data.project);
    this.project = this.data.project;
  }

  closeDialog(backlog:any){
    this.dialogRef.close(backlog?backlog:false);
  }
}