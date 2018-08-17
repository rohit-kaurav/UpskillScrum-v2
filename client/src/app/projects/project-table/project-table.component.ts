import { popInOut } from './../../animations/animation-effects.component.animation';
import { UserService } from './../../services/user.service';
import { ProjectService } from './../../services/project.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'project-table',
  templateUrl: './project-table.component.html',
  styleUrls: ['./project-table.component.css'],
  animations: [popInOut]
})
export class ProjectTableComponent implements OnInit {

  constructor(private projectservice: ProjectService,
    private userservice: UserService) {
    this.currentUser = this.userservice.getCurrentUser();
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // project_name
  // project_uid
  // owned_by
  // project_description
  // created_at
  // date_modified
  // start_date
  // estimated_completion_date
  // actual_completion_date
  // status
  // activity

  currentUser: any;
  displayedColumns: string[] = ['project_name', 'status', 'created_at', 'date_modified'];
  projectsData = new MatTableDataSource();
  notifyText: string = "";
  notifyType: string = "";
  notify: boolean = false;

  ngOnInit() {
    if (this.currentUser.role == 'manager') {
      this.getAllProjectsOfManager()
    } else if (this.currentUser.role == 'employee') {
      this.getAllProjectsOfEmployee();
    } else {
      this.getAllProjects();
    }
  }

  ngAfterViewInit() {
    this.projectsData.paginator = this.paginator;
    this.projectsData.sort = this.sort;
  }

  getAllProjects() {
    this.projectservice.getAllProjects().subscribe(
      data => {
        console.log("All Projects data came ", data);
        if (!data.message) {
          this.projectsData.data = data;
        } else {
          this.showSnackBar("No Projects added!", "other", 4000);
        }
      }, error => {
        console.log("All Projects error came ", error);
      }
    )
  }

  getAllProjectsOfManager() {
    this.projectservice.getProjectWithManagerId(this.currentUser.employee_id)
      .subscribe(data => {
        console.log("Projects for manager came ", data);
        if(!data.message){
          this.projectsData.data = data;
        }else{
          this.showSnackBar("No Projects found!", "other", 4000);
        }
      }), error => {
        console.log("Projects for manager error came ", error);
      }
  }

  getAllProjectsOfEmployee() {
    this.projectservice.getProjectWithEmployeeId(this.currentUser.employee_id)
      .subscribe(data => {
        console.log("Projects for employee came ", data);
        if(!data.message){
          this.projectsData.data = data;
        }else{
          this.showSnackBar("No Projects found!", "other", 4000);
        }
      }), error => {
        console.log("Projects for employee error came ", error);
      }
  }

  applySearch(searchValue: string) {
    searchValue = searchValue.trim();
    searchValue = searchValue.toLowerCase();
    this.projectsData.filter = searchValue;
  }

  showSnackBar(message: string, type: string, interval: number) {
    this.notifyText = message;
    this.notifyType = type;
    this.notify = true;
    setTimeout(() => {
      this.notify = false;
      this.notifyText = "";
      this.notifyType = "";
    }, interval);
  }
}
