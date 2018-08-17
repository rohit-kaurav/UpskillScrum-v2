import { slideHorizontal, fade } from './../animations/animation-effects.component.animation';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  animations: [slideHorizontal, fade]
})
export class ProjectsComponent {

  constructor() { }
}
