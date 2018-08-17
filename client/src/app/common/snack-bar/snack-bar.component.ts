import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.css']
})
export class SnackBarComponent implements OnInit {

  constructor() { }

  @Input('snackText') text: string;
  @Input('snackType') actionType: string;
  color: string;

  ngOnInit() {
    if(this.actionType == 'success'){
      this.color = "#84ca13";
    }else if(this.actionType == 'failure'){
      this.color = "#E74C3C";
    }else{
      this.color = 'gray';
    }
  }

}
