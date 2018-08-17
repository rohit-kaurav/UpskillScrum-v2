import { UserService } from './../../services/user.service';
import { fade, popInOut } from './../../animations/animation-effects.component.animation';
import { ProjectInfoValidation } from './project-info.validator';
import { FormBuilder, Validators, COMPOSITION_BUFFER_MODE } from '@angular/forms';
import { Component, OnInit, Input, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations';
import { ProjectService } from '../../services/project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css'],
  animations: [popInOut, fade]
})
export class ProjectFormComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private projectservice: ProjectService,
              private userservice: UserService,
              private router: Router) {
    this.currentUser = this.userservice.getCurrentUser();
    this.projectForm = this.fb.group({
      projectname: [this.updateProject ? this.updateProject.project_name : '',
      Validators.required,
        // ProjectInfoValidation.alreadyExists(this.projectservice)
      ],
      description: [this.updateProject ? this.updateProject.project_description : '',
      [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(5000)
      ]
      ],
      owned_by: [this.updateProject ? this.updateProject.owned_by : 'Unassigned'],
      start_date: [this.updateProject ? this.updateProject.start_date : '',
      Validators.required
      ],
      estimated_completion_date: ['',
        Validators.required
      ]
    })
  }

  @Input('projectData') updateProject: any;
  @Output('updateFlag') projectUpdateFlag = new EventEmitter();

  projectForm: any;
  currentUser:any;
  allManagers = new Array();
  mandatory = false;
  notify: boolean = false;
  notifyText: string = "";
  notifyType: string = "";

  ngOnInit() {
    this.getAllManagers();
    if(this.updateProject){
      this.projectname.setValue(this.updateProject.project_name);
      this.description.setValue(this.updateProject.project_description);
      this.start_date.setValue(this.updateProject.start_date);
      this.owned_by.setValue(this.updateProject.owned_by);
    }
    console.log("to be update project ", this.updateProject);
  }

  get projectname() {
    return this.projectForm.get('projectname');
  }

  get description() {
    return this.projectForm.get('description');
  }

  get owned_by() {
    return this.projectForm.get('owned_by');
  }

  get start_date() {
    return this.projectForm.get('start_date');
  }

  get estimated_completion_date() {
    return this.projectForm.get('estimated_completion_date');
  }

  getAllManagers() {
    this.userservice.getAllUsersByRole('manager').subscribe(
      data => {
        console.log("All managers list data came ", data);
        this.allManagers = data;
      }, error => {
        console.log("All Managers list error came ", error);
      }
    )
  }

  onSubmit() {
    if (this.projectForm.valid) {
      let newProject = {
        owned_by: this.owned_by.value,
        project_name: this.projectname.value,
        project_description: this.description.value,
        start_date: this.getLocalDate(this.start_date.value),
        estimated_completion_date: this.getLocalDate(this.estimated_completion_date.value)
      }
      this.projectservice.createProject(newProject)
        .subscribe(
          data => {
            console.log("Successfully Created ", data);
            this.showSnackBar("Project Added Successfully!", "success", 3000);
          },
          error => {
            console.log("Project Creation Failed", error, newProject);
            this.showSnackBar("Failed to create Project!", "failure", 3000);
          }
        )
    } else {
      this.mandatory = true
      setTimeout(() => {
        this.mandatory = false
      }, 2000);
    }
  }

  onUpdate() {
    console.log("why is it happening ",this.projectForm);
    if (this.projectname.valid && this.description.valid && this.start_date.valid && this.owned_by.valid) {
      let updatedProjectData = {
        project_uid: this.updateProject.project_uid,
        project_name: this.projectForm.value.projectname,
        project_description: this.projectForm.value.description,
        start_date: this.getLocalDate(this.start_date.value),
        owned_by: this.projectForm.value.owned_by
      }
      console.log("what is updated data ", updatedProjectData);
      this.projectservice.updateProject(updatedProjectData).subscribe(
        resp => {
          console.log("Project update response came ", resp);
          this.showSnackBar("Updated Project Successfully!", "success", 2500);
          this.projectUpdateFlag.emit(true);
        }, error => {
          console.log("Project update error came ", error);
          this.showSnackBar("Failed to Update Project!", "failure", 2500);
        }
      )
    } else {
      this.showSnackBar("All fields must be valid.", "other", 3500);
    }
  }

  resetForm() {
    this.projectForm.reset();
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

  getLocalDate(dateString) {
    let selectedDate = new Date(dateString);
    let localDate = new Date(selectedDate.getTime() - (selectedDate.getTimezoneOffset() * 60000));
    return localDate.getFullYear() + "-" + (localDate.getMonth() + 1) + "-" + localDate.getDate();
  }
}