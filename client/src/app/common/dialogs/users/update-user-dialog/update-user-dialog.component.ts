import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-update-user-dialog',
  templateUrl: './update-user-dialog.component.html',
  styleUrls: ['./update-user-dialog.component.css']
})
export class UpdateUserDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
              private dialog: MatDialogRef<UpdateUserDialogComponent>) { }

  user: any;
  userIsUpdated: boolean = false;

  ngOnInit() {
    console.log("user update dialog data ",this.data.user);
    this.user = this.data.user;
  }

  closeDialog(){
    this.dialog.close(this.userIsUpdated);
  }

  userUpdateFlag(isUpdated){
    this.userIsUpdated = isUpdated;
    this.closeDialog();
  }

}