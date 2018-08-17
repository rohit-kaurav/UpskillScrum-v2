import { MatDialog } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IterationService } from '../../services/iteration.service';
import { BacklogService } from '../../services/backlog.service';
import { ProjectService } from '../../services/project.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../models/user.model';
import { ProjectInfoValidation } from '../../forms/project-form/project-info.validator';
import { UserService } from '../../services/user.service';
import { UpdateProjectDialogComponent } from '../../common/dialogs/projects/update-project-dialog/update-project-dialog.component';

@Component({
  selector: 'project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.css']
})
export class ProjectInfoComponent implements OnInit {

  constructor(private dialog: MatDialog,
    private fb: FormBuilder,
    private projectservice: ProjectService,
    private router: Router,
    private route: ActivatedRoute,
    private userservice: UserService) {

    this.currentUser = this.userservice.getCurrentUser();
    this.projectEditForm = fb.group({
      projectname: ['',
        Validators.required,
        ProjectInfoValidation.alreadyExists(this.projectservice)
      ],
      description: ['',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(5000)
        ]
      ]
    })
  }

  private projectEditForm;
  private iterations = new Array();
  activityArray = new Array();
  users = {};
  currentUser: any;
  project: any;
  statusColor: any;
  backlogs = new Array();
  projectOption = "backlogs";

  get projectname() {
    return this.projectEditForm.get('projectname');
  }

  get description() {
    return this.projectEditForm.get('description');
  }

  ngOnInit() {
    let project_uid;
    // Collecting URL parameters
    this.route.paramMap.subscribe(
      params => {
        project_uid = params.get('id')
      }
    )
    this.getProjectData(project_uid);
    this.getAllUsers();
  }

  // Function to get project data using project uid
  getProjectData(project_uid) {
    this.projectservice.getProject(project_uid)
      .subscribe(
        data => {
          console.log("project-info data ", data);
          this.project = data;
          this.activityArray = this.project.activity;
          if (this.project['status'] == 'New') this.statusColor = "#5DADE2";
          else if (this.project['status'] == 'In Progress') this.statusColor = "#DC7633";
          else if (this.project['status'] == 'Completed') this.statusColor = "#2ECC71";
          else if (this.project['status'] == 'Hold') this.statusColor = "#757476";
        },
        error => {
          console.log("project-info error ", error)
        }
      )
  }

  getAllUsers(){
    this.userservice.getAllUsers().subscribe(
      data => {
        console.log("Users came in project-info ",data);
        if(!data.message){
          for(let i=0;i<data.length;i++){
            if(data[i].employee_id!='000000'){
              this.users[data[i].employee_id]=data[i].username;
            }
          }
        }
      },error => {
        console.log("error, Unable to fetch users in project-info ",error);
      }
    )
  }

  editProject() {
    this.dialog.open(UpdateProjectDialogComponent, {
      data: {
        project: this.project
      },
      minHeight: '550px',
      minWidth: '560px'
    }).afterClosed().subscribe(
      data => {
        console.log("Data after project update dialog close ", data);
        if(data){
          this.getProjectData(this.project.project_uid);
        }
      }, error => {
        console.log("Error after project update dialog close ", error);
      }
    )
  }
}
