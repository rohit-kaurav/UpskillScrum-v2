import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent {

  constructor(
    private dialogRef: MatDialogRef<DialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any) { 
      console.log("Data in dialog ",data);
      this.title = data.title;
      this.content = data.content;
  }

  private title = "";
  private content = "";

  onNoClick(): void {
    this.dialogRef.close();
  }

}
