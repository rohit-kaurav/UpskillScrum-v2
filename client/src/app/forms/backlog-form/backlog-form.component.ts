import { fade, popInOut } from './../../animations/animation-effects.component.animation';
import { BacklogInfoValidation } from './backlog-info.validator';
import { transition, trigger, animate, style, state } from '@angular/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { BacklogService } from './../../services/backlog.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'backlog-form',
  templateUrl: './backlog-form.component.html',
  styleUrls: ['./backlog-form.component.css'],
  animations: [fade, popInOut]
})
export class BacklogFormComponent implements OnInit {

  /* required backlog fields
    1 backlog name
    2 backlog_description
    3 project_uid
    4 backlog start date
    5 backlog end date
    6 backlog efforts required
  */

  constructor(private fb: FormBuilder,
    private router: Router,
    private backlogservice: BacklogService,
    private route: ActivatedRoute) {
    this.backlogForm = fb.group({
      backlogname: ['',
        Validators.required,
        // BacklogInfoValidation.alreadyExists(this.backlogservice,this)
      ],
      description: ['',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(5000)
        ]
      ],
      startdate: ['',
        Validators.required
      ],
      enddate: ['',
        Validators.required
      ],
      estimatedefforts: ['',
        Validators.required,
      ]
    })
  }

  @Input("project") project: any;
  @Input("backlogData") updateBacklogData: any;
  @Output("updateFlag") backlogEmitter = new EventEmitter();

  backlogForm;
  mandatory = false;
  notify: boolean = false;
  notifyText: string = "";
  notifyType: string = "";

  ngOnInit() {
    // this.route.queryParamMap.subscribe(
    //   params => {
    //     this.project_uid = params.get('project_uid')
    //     this.project_name = params.get('project_name')
    //   }
    // )
    if(this.updateBacklogData){
      this.backlogname.setValue(this.updateBacklogData.backlog_name);
      this.description.setValue(this.updateBacklogData.backlog_description);
      this.startdate.setValue(this.updateBacklogData.planned_start_date);
      this.enddate.setValue(this.updateBacklogData.planned_end_date);
      this.estimatedefforts.setValue(this.updateBacklogData.estimated_efforts);
    }
  }

  get backlogname() {
    return this.backlogForm.get('backlogname');
  }

  get description() {
    return this.backlogForm.get('description');
  }

  get startdate(){
    return this.backlogForm.get('startdate');
  }

  get enddate(){
    return this.backlogForm.get('enddate');
  }

  get estimatedefforts(){
    return this.backlogForm.get('estimatedefforts');
  }

  onSubmit() {
    if (this.backlogForm.valid) {
      let backlog_data = {
        project_uid: this.project.project_uid,
        backlog_name: this.backlogname.value,
        backlog_description: this.description.value,
        planned_start_date: this.getLocalDate(this.startdate.value),
        planned_end_date: this.getLocalDate(this.enddate.value),
        estimated_efforts: this.estimatedefforts.value
      }
      this.backlogservice.createBacklog(backlog_data)
        .subscribe(
          data => {
            if(!data.message){
              console.log("Backlog added", data);
              this.showSnackBar("Backlog created Successfully!","success",2500);
              this.backlogEmitter.emit(data);
            }else{
              this.showSnackBar("Failed to created Backlog, try again!","failure",3000)
            }
          },
          error => {
            console.log("Backlog add failed ", error);
            this.showSnackBar("Failed to created Backlog. All fields must be valid!","failure",3000);
          }
        )
    } else {
      this.mandatory = true
      setTimeout(() => {
        this.mandatory = false
      }, 2500);
    }
  }

  updateBacklog(){
    console.log("updating backlog form ",this.backlogForm);
    if(this.backlogForm.valid){
      if(!this.backlogname.pristine || !this.description.pristine){
        let backlogData = {
          backlog_uid: this.updateBacklogData.backlog_uid,
          backlog_name: this.backlogname.value,
          backlog_description: this.description.value,
          status: this.updateBacklogData.status,
          iteration_uid: this.updateBacklogData.iteration_uid
        }
        this.backlogservice.updateBacklog(backlogData).subscribe(
          data => {
            console.log("Backlog updated successfully ",data);
            this.backlogEmitter.emit(true);
          },error => {
            console.log("Backlog update failed ",error);
          }
        )
      }
    }
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
