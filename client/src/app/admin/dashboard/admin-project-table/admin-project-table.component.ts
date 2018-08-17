import { IterationService } from './../../../services/iteration.service';
import { BacklogService } from './../../../services/backlog.service';
import { DialogBoxComponent } from './../../../common/dialog-box/dialog-box.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectService } from '../../../services/project.service';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { popInOut } from '../../../animations/animation-effects.component.animation';
import { UpdateProjectDialogComponent } from '../../../common/dialogs/projects/update-project-dialog/update-project-dialog.component';

@Component({
  selector: 'admin-project-table',
  templateUrl: './admin-project-table.component.html',
  styleUrls: ['./admin-project-table.component.css'],
  animations: [popInOut]
})
export class AdminProjectTableComponent implements OnInit {

  constructor(private projectservice: ProjectService,
              private backlogservice: BacklogService,
              private iterationservice: IterationService,
              private dialog: MatDialog) { }

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

  displayedColumns: string[] = ['project_name', 'status', 'owned_by', 'created_at', 'date_modified', 'actions'];
  projectsData = new MatTableDataSource();
  notifyText: string = "";
  notifyType: string = "";
  notify: boolean = false;

  ngOnInit() {
    this.getAllProjects();
  }

  ngAfterViewInit() {
    this.projectsData.paginator = this.paginator;
    this.projectsData.sort = this.sort;
  }

  getAllProjects() {
    this.projectservice.getAllProjects().subscribe(
      data => {
        console.log("All Projects data came ", data);
        if (data.length) {
          this.projectsData.data = data;
        } else {
          this.showSnackBar("No Projects added!", "other", 4000);
        }
      }, error => {
        console.log("All Projects error came ", error);
      }
    )
  }

  applySearch(searchValue: string) {
    searchValue = searchValue.trim();
    searchValue = searchValue.toLowerCase();
    this.projectsData.filter = searchValue;
  }

  removeProject(id) {
    this.openDialog(this.getProjectNameWithId(id)).subscribe(
      data => {
        if (data) {
          this.projectservice.deleteProject(id).subscribe(
            data => {
              console.log("Project deleted successfully ", data);
              if (data.message == 'Deleted Successfully.') {
                this.removeProjectFromTable(id);
                this.showSnackBar("Project Deleted Successfully!", "success", 2500);
              } else {
                this.showSnackBar("No Project found for deletion!", "failure", 2500);
              }
            }, error => {
              console.log("Project deletion failed ", error);
              this.showSnackBar("Project Deletion Failed. Please try again!", "failure", 2500);
            }
          )
        }
      }, error => {
        console.log("Dialog box error ", error);
      }
    )
  }

  checkBacklogsInProject(id){
    this.backlogservice.getAllBacklogsWithProject(id).subscribe(
        data => {
          console.log("backlogs are not here , ",data);
          if(data.message){
            this.checkIterationsInProject(id);
          }else{
            this.showSnackBar("Unable to delete Project, it contains Backlogs","failure",2500);
          }
        },error => {
          console.log("backlogs are not here but error ",error);
          this.showSnackBar("Unable to delete Project, it contains Backlogs","failure",2500);
        }
      )
  }

  checkIterationsInProject(id){
    this.iterationservice.getAllIterationsByProjectId(id).subscribe(
      data => {
        console.log("iterations are not here ",data);
        if(data.message){
          this.removeProject(id);
        }else{
          this.showSnackBar("Unable to delete Project, it contains Iterations","failure",2500);
        }
      },error => {
        console.log("iterations are not here but error ",error);
        this.showSnackBar("Unable to delete Project, it contains Iterations","failure",2500);
      }
    )
  }

  openDialog(projectName: string) {
    return this.dialog.open(DialogBoxComponent, {
        minWidth: '360px',
        data: {
          title: "Delete",
          content: "Do you want to delete project '" + projectName + "'?"
        }
      }).afterClosed();
  }

  openUpdateDialog(project) {
    this.dialog.open(UpdateProjectDialogComponent, {
      data: {
        project: project
      },
      minWidth: '560px'
    }).afterClosed().subscribe(
      resp => {
        console.log("Project updation response ", resp);
        this.getAllProjects();
      }
    )
  }

  removeProjectFromTable(id) {
    for (let i = 0; i < this.projectsData.data.length; i++) {
      if (this.projectsData.data[i]['project_uid'] == id) {
        this.projectsData.data.splice(i, 1);
        this.projectsData.data = this.projectsData.data;
        break;
      }
    }
  }

  getProjectNameWithId(id) {
    for (let i = 0; i < this.projectsData.data.length; i++) {
      if (this.projectsData.data[i]['project_uid'] == id) {
        return this.projectsData.data[i]['project_name'];
      }
    }
    return null;
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
