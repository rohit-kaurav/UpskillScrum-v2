import { slideHorizontal, fade, popInOut } from './../../animations/animation-effects.component.animation';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [slideHorizontal, fade, popInOut]
})
export class DashboardComponent{

  constructor(private projectservice: ProjectService) { }

  showForm = false;
}
